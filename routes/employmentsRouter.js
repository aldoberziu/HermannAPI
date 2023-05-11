const express = require('express');
const generalController = require('../controllers/generalController');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(viewController.getAllEmployments)
  .post(authController.isLoggedIn, generalController.createEmployment);

router.route('/api').get(generalController.getAllEmployments);
router
  .route('/:id')
  .get(generalController.getOneEmployment)
  .patch(
    // authController.isLoggedIn,
    generalController.uploadEmploymentImage,
    generalController.resizeEmploymentImage,
    generalController.updateEmployment
  )
  .delete(authController.isLoggedIn, generalController.deleteEmployment);

module.exports = router;