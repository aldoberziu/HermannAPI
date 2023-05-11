const express = require('express');
const generalController = require('../controllers/generalController');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(viewController.getAllCoachings)
  .post(
    // authController.isLoggedIn,
    generalController.createCoaching)

router.route('/:slug').get(viewController.getOneCoaching);
router.route('/api').get(generalController.getAllCoachings);
router
  .route('/:id')
  .get(generalController.getOneCoaching)
  .patch(
    // authController.isLoggedIn,
    generalController.uploadCoachingImages,
    generalController.resizeCoachingImages,
    generalController.updateCoaching
  )
  .delete(
    // authController.isLoggedIn, 
    generalController.deleteCoaching);

module.exports = router;
