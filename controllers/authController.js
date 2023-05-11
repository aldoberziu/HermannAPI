const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const Notif = require('../models/notifModel');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (admin, statusCode, res) => {
  const token = signToken(admin._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  admin.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      admin,
    },
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newAdmin = await Admin.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordSecret: req.body.passwordSecret
  });

  createSendToken(newAdmin, 201, res);
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password, passwordSecret } = req.body;

  if (!email || !password || !passwordSecret) {
    return next(
      new AppError('Please provide your email, password and secret password!'),
      401
    );
  }

  const admin = await Admin.findOne({ email }).select('+password').select('+passwordSecret')
  if (!admin) return next(new AppError('Incorrect email!', 401));

  if (!(await admin.correctPassword(password, admin.password))) {
    return next(new AppError('Incorrect password', 401));
  }
  if (!(await admin.correctPassword(passwordSecret, admin.passwordSecret))) {
    return next(new AppError('Incorrect secret password', 401));
  }
  createSendToken(admin, 200, res);
});
exports.logout = (req, res) => {
  res.cookie('jwt', 'jwt', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
};
exports.protect = catchAsync(async (req, res, next) => {
  // 1) get token & check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError('You cannot access this page. Please login first!')
    );
  }
  // 2) token verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) check if admin still exists
  const currentAdmin = await Admin.findById(decoded.id);
  if (!currentAdmin) {
    return next(
      new AppError('The admin belonging to this token does not exist anymore!'),
      401
    );
  }
  // 4) grant access to the protected route
  req.admin = currentAdmin;
  res.locals.admin = currentAdmin;
  next();
});
exports.isLoggedIn = async (req, res, next) => {
  // 1) verify token
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) check if admin still exists
      const currentAdmin = await Admin.findById(decoded.id);
      if (!currentAdmin) {
        return next();
      }
      res.locals.admin = currentAdmin;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};
