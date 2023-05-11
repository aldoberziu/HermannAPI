const express = require('express');
const generalController = require('../controllers/generalController');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(viewController.getAllProjects)
  .post(generalController.createProject);

router.route('/api').get(generalController.getAllProjects);
router.route('/:slug').get(viewController.getOneProject);
router
  .route('/:id')
  .get(generalController.getOneProject)
  .patch(
    authController.isLoggedIn,
    generalController.uploadProjectImages,
    generalController.resizeProjectImages,
    generalController.updateProject
  )
  .delete(generalController.deleteProject);

module.exports = router;
