const Notif = require('../models/notifModel');
const Activity = require('../models/activityModel');
const Project = require('../models/projectModel');
const Award = require('../models/awardModel');
const Partner = require('../models/partnerModel');
const Competition = require('../models/competitionModel');
const Coaching = require('../models/coachingModel');
const Teacher = require('./../models/teacherModel');
const Employment = require('./../models/employmentModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const sharp = require('sharp');
const multer = require('multer');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  //shif ket se ndoshta t blloko 'pdf/*' per mo von
  if (!file.mimetype.startsWith('image/*')) {
    cb(null, true);
  } else {
    cb(new AppError('Ju lutem, ngarkoni vetem foto!', 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//NOTIFS
exports.uploadNotifImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]);
exports.resizeNotifImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();
  // if (req.files.images.length > 10)
  //   return new AppError('Numri maksimal i fotove eshte 10.', 500);

  // 1) IMAGE COVER
  req.body.imageCover = `notif-${req.params.id}-${Date.now()}-cover.png`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFile(`images/notifs/${req.body.imageCover}`);

  // 2) IMAGES
  documentImages = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `notif-${req.params.id}-${Date.now()}-${i + 1}.png`;
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFile(`images/notifs/images/${filename}`);
      documentImages.push(filename);
    })
  );
  const document = await Notif.findById(req.params.id);
  req.body.images = [].concat(document.images, documentImages);
  next();
});
//TEACHERS
exports.uploadTeacherImage = upload.fields([{ name: 'image', maxCount: 1 }]);
exports.resizeTeacherImage = catchAsync(async (req, res, next) => {
  if (!req.files.image) return next();

  // 1) IMAGE
  req.body.image = `teacher-${req.params.id}-${Date.now()}.png`;
  await sharp(req.files.image[0].buffer)
    .resize(250, 250)
    .toFile(`images/${req.body.image}`);
  next();
});
//PARTNERS
exports.uploadPartnerImage = upload.fields([
  { name: 'imageCover', maxCount: 1 },
]);
exports.resizePartnerImage = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover) return next();

  // 1) IMAGE
  req.body.imageCover = `partner-${Date.now()}.png`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFile(`images/partners/${req.body.imageCover}`);
  next();
});
//ACTIVITIES
exports.uploadActivityImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]);
exports.resizeActivityImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();
  if (req.files.images.length > 10)
    return new AppError('Numri maksimal i fotove eshte 10.', 500);

  // 1) IMAGE COVER
  req.body.imageCover = `activity-${req.params.id}-${Date.now()}-cover.png`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFile(`images/activities/${req.body.imageCover}`);

  // 2) IMAGES
  documentImages = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `activity-${req.params.id}-${Date.now()}-${i + 1}.png`;
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFile(`images/activities/images/${filename}`);

      documentImages.push(filename);
    })
  );
  const document = await Activity.findById(req.params.id);
  req.body.images = [].concat(document.images, documentImages);
  next();
});
//COACHINGS
exports.uploadCoachingImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]);
exports.resizeCoachingImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();
  if (req.files.images.length > 10)
    return new AppError('Numri maksimal i fotove eshte 10.', 500);

  // 1) IMAGE COVER
  req.body.imageCover = `coaching-${req.params.id}-${Date.now()}-cover.png`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFile(`images/coachings/${req.body.imageCover}`);

  // 2) IMAGES
  documentImages = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `coaching-${req.params.id}-${Date.now()}-${i + 1}.png`;
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFile(`images/coachings/images/${filename}`);

      documentImages.push(filename);
    })
  );
  const document = await Coaching.findById(req.params.id);
  req.body.images = [].concat(document.images, documentImages);
  next();
});
//AWARDS
exports.uploadAwardImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]);
exports.resizeAwardImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();
  if (req.files.images.length > 10)
    return new AppError('Numri maksimal i fotove eshte 10.', 500);

  // 1) IMAGE COVER
  req.body.imageCover = `award-${req.params.id}-${Date.now()}-cover.png`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFile(`images/awards/${req.body.imageCover}`);

  // 2) IMAGES
  documentImages = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `award-${req.params.id}-${Date.now()}-${i + 1}.png`;
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFile(`images/awards/images/${filename}`);
      documentImages.push(filename);
    })
  );
  const document = await Award.findById(req.params.id);
  req.body.images = [].concat(document.images, documentImages);
  next();
});
//PROJECTS
exports.uploadProjectImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]);
exports.resizeProjectImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();
  if (req.files.images.length > 10)
    return new AppError('Numri maksimal i fotove eshte 10.', 500);

  // 1) IMAGE COVER
  req.body.imageCover = `project-${req.params.id}-${Date.now()}-cover.png`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFile(`images/projects/${req.body.imageCover}`);

  // 2) IMAGES
  documentImages = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `project-${req.params.id}-${Date.now()}-${i + 1}.png`;
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFile(`images/projects/images/${filename}`);
      documentImages.push(filename);
    })
  );
  const document = await Project.findById(req.params.id);
  req.body.images = [].concat(document.images, documentImages);
  next();
});
//COMPETITIONS
exports.uploadCompetitionImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]);
exports.resizeCompetitionImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();
  if (req.files.images.length > 10)
    return new AppError('Numri maksimal i fotove eshte 10.', 500);

  // 1) IMAGE COVER
  req.body.imageCover = `competition-${req.params.id}-${Date.now()}-cover.png`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFile(`images/competitions/${req.body.imageCover}`);

  // 2) IMAGES
  documentImages = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `competition-${req.params.id}-${Date.now()}-${
        i + 1
      }.png`;
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFile(`images/competitions/images/${filename}`);

      documentImages.push(filename);
    })
  );
  const document = await Competition.findById(req.params.id);
  req.body.images = [].concat(document.images, documentImages);
  next();
});
//EMPLOYMENTS
exports.uploadEmploymentImage = upload.fields([
  { name: 'imageCover', maxCount: 1 },
]);
exports.resizeEmploymentImage = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover) return next();

  // 1) IMAGE
  req.body.imageCover = `employment-${req.params.id}-${Date.now()}.png`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFile(`images/employment/${req.body.imageCover}`);
  next();
});

//USE updateOne per me bo update nga admini

exports.deleteNotif = factory.deleteOne(Notif);
exports.updateNotif = factory.updateOneDev(Notif);
exports.createNotif = factory.createOne(Notif);
exports.getAllNotifs = factory.getAll(Notif);
exports.getOneNotif = factory.getOne(Notif);

exports.getAllTeachers = factory.getAll(Teacher);
exports.getOneTeacher = factory.getOne(Teacher);
exports.createTeacher = factory.createOne(Teacher);
exports.deleteTeacher = factory.deleteOne(Teacher);
exports.updateTeacher = factory.updateOneDev(Teacher);

exports.getAllAwards = factory.getAll(Award);
exports.getOneAward = factory.getOne(Award);
exports.createAward = factory.createOne(Award);
exports.deleteAward = factory.deleteOne(Award);
exports.updateAward = factory.updateOneDev(Award);

exports.getAllActivities = factory.getAll(Activity);
exports.getOneActivity = factory.getOne(Activity);
exports.createActivity = factory.createOne(Activity);
exports.deleteActivity = factory.deleteOne(Activity);
exports.updateActivity = factory.updateOneDev(Activity);

exports.getAllCompetitions = factory.getAll(Competition);
exports.getOneCompetition = factory.getOne(Competition);
exports.createCompetition = factory.createOne(Competition);
exports.deleteCompetition = factory.deleteOne(Competition);
exports.updateCompetition = factory.updateOneDev(Competition);

exports.getAllCoachings = factory.getAll(Coaching);
exports.getOneCoaching = factory.getOne(Coaching);
exports.createCoaching = factory.createOne(Coaching);
exports.deleteCoaching = factory.deleteOne(Coaching);
exports.updateCoaching = factory.updateOneDev(Coaching);

exports.getAllPartners = factory.getAll(Partner);
exports.getOnePartner = factory.getOne(Partner);
exports.createPartner = factory.createOne(Partner);
exports.deletePartner = factory.deleteOne(Partner);
exports.updatePartner = factory.updateOneDev(Partner);

exports.getAllEmployments = factory.getAll(Employment);
exports.getOneEmployment = factory.getOne(Employment);
exports.createEmployment = factory.createOne(Employment);
exports.deleteEmployment = factory.deleteOne(Employment);
exports.updateEmployment = factory.updateOneDev(Employment);

exports.getAllProjects = factory.getAll(Project);
exports.getOneProject = factory.getOne(Project);
exports.createProject = factory.createOne(Project);
exports.deleteProject = factory.deleteOne(Project);
exports.updateProject = factory.updateOneDev(Project);
