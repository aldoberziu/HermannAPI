const express = require('express');
const generalController = require('./../controllers/generalController');
const authController = require('./../controllers/authController');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router
  .route('/')
  .get(viewController.getAllTeachers)
  .post(
    authController.isLoggedIn,
    generalController.createTeacher
  );

router
  .route('/:id')
  .get(generalController.getOneTeacher)
  .patch(
    // authController.isLoggedIn,
    generalController.uploadTeacherImage,
    generalController.resizeTeacherImage,
    generalController.updateTeacher
  )
  .delete(
    authController.isLoggedIn,
    generalController.deleteTeacher
  );

module.exports = router;
