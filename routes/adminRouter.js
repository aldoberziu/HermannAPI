const express = require('express');
const authController = require('../controllers/authController');
const generalController = require('../controllers/generalController');
const viewController = require('../controllers/viewController');
const Notif = require('../models/notifModel');

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/logout', authController.logout);

router.route('/').get(viewController.getAllOnAdmin);
// router.route('/update/njoftime/:id').get(viewController.updateNotif);
// router.route('/update/njoftime/:id').get(viewController.updateDoc);
router.route('/delete/njoftime/:id').get(generalController.deleteNotif);
router.route('/delete/aktivitete/:id').get(generalController.deleteActivity);
router.route('/delete/mesuesit/:id').get(generalController.deleteTeacher);
router.route('/delete/trajnime/:id').get(generalController.deleteCoaching);
router.route('/delete/cmime/:id').get(generalController.deleteAward);
router.route('/delete/konkurse/:id').get(generalController.deleteCompetition);

// router.route('/aktivitete').get(viewController.getAllActivitiesOnAdmin);

// router
//   .route('/:id')
//   .get(generalController.getOneNotif)
//   .patch(generalController.updateNotif)
//   .delete(generalController.deleteNotif);

module.exports = router;
