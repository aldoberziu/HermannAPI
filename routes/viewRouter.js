const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const notifsRouter = require('./notifsRouter');
const projectsRouter = require('./projectsRouter');
const partnersRouter = require('./partnersRouter');
const awardsRouter = require('./awardsRouter');
const activitiesRouter = require('./activitiesRouter');
const competitionsRouter = require('./competitionsRouter');
const coachingsRouter = require('./coachingsRouter');
const adminRouter = require('./adminRouter');
const teachersRouter = require('./teachersRouter');
const maturaRouter = require('./maturaRouter');
const employmentsRouter = require('./employmentsRouter');

const router = express.Router();

router.use('/home', viewController.getWelcome);
router.get('/admin', authController.isLoggedIn, viewController.getLoginForm);//production
router.use('/rreth-shkolles', viewController.getAbout);
router.use('/kontakt', viewController.getContact);
// router.use('/partneret', viewController.getAllPartners);
router.use('/afp', viewController.getAfp);
router.use('/kurrikula', viewController.getKurrikula);
router.use('/projektee', viewController.getProjekte);
router.use('/fakte', viewController.getFacts);
router.use('/inxhinieria', viewController.getInxhinieria);
router.use('/ambientet', viewController.getAmbientet);
router.use('/ligje-urdhera-udhezime', viewController.getLigjet);
router.use('/admin-dashboard',  authController.protect, adminRouter);
router.use('/matura', viewController.getMatura);
router.use('/njoftime', notifsRouter);
router.use('/projekte', projectsRouter);
router.use('/mesuesit', teachersRouter);
router.use('/cmime', awardsRouter);
router.use('/aktivitete', activitiesRouter);
router.use('/konkurse', competitionsRouter);
router.use('/partneret', partnersRouter);
router.use('/trajnime', coachingsRouter);
router.use('/punesime', employmentsRouter);

module.exports = router;
