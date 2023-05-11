const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Administratori duhet te kete nje emer.'],
    trim: true,
    max: [30, 'Nje emer administratori duhet te kete maksimumi 30 shkronja.'],
    min: [5, 'Nje emer administratori duhet te kete te pakten 5 shkronja.'],
  },
  email: {
    type: String,
    required: [true, 'Administratori duhet te perdore nje email'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Ju lutem shkruani nje email te sakte!'],
  },
  password: {
    type: String,
    required: [true, 'Administratori duhet te krijoje nje password.'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Ju lutem konfirmoni passwordin!'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwordet nuk perputhen!',
    },
    select: false,
  },
  passwordSecret: {
    type: String,
    required: [true, 'Administratori duhet te kete nje password sekret.'],
    minLength: 8,
    select: false,
  },
});

// hash passwords
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordSecret = await bcrypt.hash(this.passwordSecret, 12);
  this.passwordConfirm = undefined;
  next();
});

// check if database password matches the input form password
adminSchema.methods.correctPassword = async function (candidatePassword, adminPassword) {
  return await bcrypt.compare(candidatePassword, adminPassword);
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
