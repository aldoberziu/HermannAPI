const Notif = require('./../models/notifModel');
const Activity = require('../models/activityModel');
const Project = require('../models/projectModel');
const Teacher = require('./../models/teacherModel');
const Award = require('../models/awardModel');
const Partner = require('../models/partnerModel');
const Coaching = require('../models/coachingModel');
const Competition = require('../models/competitionModel');
const Employment = require('../models/employmentModel');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getLoginForm = (req, res) => {
  res.status(200).render('adminLogin', {
    title: 'Login',
  });
};
exports.getMatura = catchAsync(async (req, res) => {
  res.status(200).render('matura', {
    title: 'Matura',
  });
});
exports.getWelcome = (req, res) => {
  res.sendFile('index.html', {
    root: 'views',
  });
};
exports.getAfp = (req, res) => {
  res.status(200).render('afp', {
    title: 'Njesia e Zhvillimit',
  });
};
exports.getLigjet = (req, res) => {
  res.status(200).render('ligje', {
    title: 'Ligje, urdhera dhe udhezime',
  });
};
exports.getProjekte = (req, res) => {
  res.status(200).render('projects', {
    title: 'Projekte',
  });
};
exports.getKurrikula = (req, res) => {
  res.status(200).render('kurrikula', {
    title: 'Kurrikula Mesimore',
  });
};
exports.getFacts = (req, res) => {
  res.status(200).render('facts', {
    title: 'Fakte dhe Shifra',
  });
};
exports.getInxhinieria = (req, res) => {
  res.status(200).render('inxhinieria', {
    title: 'Inxhinieria Softwerike',
  });
};
exports.getAmbientet = (req, res) => {
  res.status(200).render('ambientet', {
    title: 'Ambientet',
  });
};
exports.getAbout = (req, res) => {
  res.status(200).render('about', {
    title: 'Rreth Nesh',
  });
};
//ADMIN DASHBOARD
// exports.updateNotif = catchAsync(async (req, res, next) => {
//   res.locals.notif = await Notif.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   // res.locals.notif = doc;
//   console.log('res.locals.notif:', res.locals.notif);

//   res.status(200).render('update', {
//     title: 'Update',
//     notif: res.locals.notif,
//   });
//   next();
// });
exports.getContact = catchAsync(async (req, res) => {
  res.status(200).render('contact', {
    title: 'Kontakt',
  });
});
exports.getAdminDashboard = catchAsync(async (req, res) => {
  res.status(200).render('adminDashboard', {
    title: 'Admin Dashboard',
  });
});
exports.getAllOnAdmin = catchAsync(async (req, res) => {
  const notifsOnAdmin = await Notif.find();
  const activitiesOnAdmin = await Activity.find();
  const teachersOnAdmin = await Teacher.find();
  const awardsOnAdmin = await Award.find();
  const coachingsOnAdmin = await Coaching.find();
  const competitionsOnAdmin = await Competition.find();
  res.status(200).render('adminDashboard', {
    title: 'Dashboard',
    notifsOnAdmin,
    activitiesOnAdmin,
    teachersOnAdmin,
    awardsOnAdmin,
    coachingsOnAdmin,
    competitionsOnAdmin,
  });
});
exports.getAllPartners = catchAsync(async (req, res) => {
  const docs = await Partner.find();
  res.status(200).render('mainCard', {
    title: 'Partneret',
    docs,
  });
});
exports.getAllTeachers = catchAsync(async (req, res) => {
  const docs = await Teacher.find();
  res.status(200).render('teacherCard', {
    title: 'Mesuesit',
    docs,
  });
});
exports.getAllEmployments = catchAsync(async (req, res) => {
  const docs = await Employment.find();
  res.status(200).render('employment', {
    title: 'Punesime',
    docs,
  });
});

exports.getOneNotif = catchAsync(async (req, res, next) => {
  const sort = { createdAt: -1 };
  const newDocs = await Notif.find().limit(4).sort(sort);
  const detailedDoc = await Notif.findOne({ slug: req.params.slug });
  res.status(200).render('collectionDetailed', {
    title: 'Njoftime',
    detailedDoc,
    newDocs,
  });
  next();
});
exports.getAllNotifs = catchAsync(async (req, res) => {
  const sort = { createdAt: -1 };
  const docs = await Notif.find().sort(sort);
  const newDocs = await Notif.find().limit(4).sort(sort);
  if (!docs) return next(new AppError('Nuk u gjet asnje njoftim', 404));
  res.status(200).render('collectionTemplate', {
    title: 'Njoftime',
    docs,
    newDocs,
  });
});

exports.getOneProject = catchAsync(async (req, res, next) => {
  const sort = { createdAt: -1 };
  const newDocs = await Project.find().limit(4).sort(sort);
  const detailedDoc = await Project.findOne({ slug: req.params.slug });
  res.status(200).render('collectionDetailed', {
    title: 'Projekte',
    detailedDoc,
    newDocs,
  });
  next();
});
exports.getAllProjects = catchAsync(async (req, res) => {
  const sort = { createdAt: -1 };
  const docs = await Project.find().sort(sort);
  const newDocs = await Project.find().limit(4).sort(sort);
  if (!docs) return next(new AppError('Nuk u gjet asnje projekt', 404));
  res.sendFile('projects.html', {
    root: 'views',
    title: 'Projekte',
    docs,
    newDocs,
  });
});

exports.getAllAwards = catchAsync(async (req, res) => {
  const sort = { year: -1 };
  const docs = await Award.find().sort(sort);
  res.status(200).render('animatedTemplate', {
    title: 'Cmime',
    docs,
  });
});
exports.getOneAward = catchAsync(async (req, res, next) => {
  const sort = { year: -1 };
  const newDocs = await Award.find().limit(4).sort(sort);
  const detailedDoc = await Award.findOne({ slug: req.params.slug });
  res.status(200).render('collectionDetailed', {
    title: 'Cmime',
    detailedDoc,
    newDocs,
  });
  next();
});

exports.getOneActivity = catchAsync(async (req, res, next) => {
  const sort = { createdAt: -1 };
  const newDocs = await Activity.find().limit(4).sort(sort);
  const detailedDoc = await Activity.findOne({ slug: req.params.slug });
  console.log(detailedDoc);
  res.status(200).render('collectionDetailed', {
    title: 'Aktivitete',
    detailedDoc,
    newDocs,
  });
  next();
});
exports.getAllActivities = catchAsync(async (req, res) => {
  const sort = { createdAt: -1 };
  const docs = await Activity.find().sort(sort);
  const newDocs = await Activity.find().limit(4).sort(sort);
  if (!docs) return next(new AppError('Nuk u gjet asnje aktivitet!', 404));
  res.status(200).render('collectionTemplate', {
    title: 'Aktivitete',
    docs,
    newDocs,
  });
});

exports.getAllCoachings = catchAsync(async (req, res) => {
  const sort = { createdAt: -1 };
  const docs = await Coaching.find().sort(sort);
  res.status(200).render('mainCard', {
    title: 'Trajnime',
    docs,
  });
});
exports.getOneCoaching = catchAsync(async (req, res, next) => {
  const sort = { createdAt: -1 };
  const newDocs = await Coaching.find().limit(4).sort(sort);
  const detailedDoc = await Coaching.findOne({ slug: req.params.slug });
  console.log(detailedDoc);
  res.status(200).render('collectionDetailed', {
    title: 'Trajnime',
    detailedDoc,
    newDocs,
  });
  next();
});

exports.getAllCompetitions = catchAsync(async (req, res) => {
  const sort = { createdAt: -1 };
  const docs = await Competition.find().sort(sort);
  res.status(200).render('mainCard', {
    title: 'Konkurse',
    docs,
  });
});
exports.getOneCompetition = catchAsync(async (req, res, next) => {
  const sort = { createdAt: -1 };
  const newDocs = await Competition.find().limit(4).sort(sort);
  const detailedDoc = await Competition.findOne({ slug: req.params.slug });
  console.log(detailedDoc);
  res.status(200).render('collectionDetailed', {
    title: 'Konkurse',
    detailedDoc,
    newDocs,
  });
  next();
});
