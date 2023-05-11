const express = require('express');
const generalController = require('../controllers/generalController');
const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.route('/').get(viewController.getAllNotifs).post(
  //posti duhet ke admini ngjit me deleten
  // authController.protect,
  // authController.isLoggedIn,
  generalController.createNotif
);
router.route('/api').get(generalController.getAllNotifs);
router.route('/:slug').get(viewController.getOneNotif);
router.route('/:id').patch(
  // authController.protect,
  // authController.isLoggedIn,
  generalController.uploadNotifImages,
  generalController.resizeNotifImages,
  generalController.updateNotif
);

module.exports = router;
