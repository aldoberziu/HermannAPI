const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('Dokumenti nuk ekziston tanimë!', 404));
    }

    res.status(204).json({
      status: 'success',
      message: 'Dokumenti u fshi me sukses!',
      data: null,
    });
    next();
  });
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.locals.notif = await Model.findById(req.params.id);
    console.log('doc:', doc);

    res.status(200).render('update', {
      title: 'Update',
      notif: doc,
    });
    next();
  });
exports.updateOneDev = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if(req.body) console.log(req.body);

    res.status(200).json({
      status: 'success',
      data: doc,
    });
    next();
  });
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: newDoc,
      },
    });
    next();
  });
exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError('Nuk ekziston nje dokument me kete ID.', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
    next();
  });
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find(); //use .explain() in this mf sometimes for query details

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        doc,
      },
    });
    next();
  });
