const express = require('express');
const generalController = require('../controllers/generalController');
const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');

const router = express.Router();

router
  .route('/')
  .get(viewController.getAllActivities)
  .post(authController.isLoggedIn, generalController.createActivity);

router.route('/:slug').get(viewController.getOneActivity);
router.route('/api').get(generalController.getAllActivities);
router
  .route('/:id')
  .get(generalController.getOneActivity)
  .patch(
    // authController.isLoggedIn,
    generalController.uploadActivityImages,
    generalController.resizeActivityImages,
    generalController.updateActivity
  )
  .delete(
    // authController.isLoggedIn,
    generalController.deleteActivity
  );

module.exports = router;
