const express = require('express');
const generalController = require('../controllers/generalController');
const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.route('/').get(viewController.getAllCompetitions).post(
  // authController.isLoggedIn,
  generalController.createCompetition
);
router.route('/api').get(generalController.getAllCompetitions);
router.route('/:slug').get(viewController.getOneCompetition);
router
  .route('/:id')
  .get(generalController.getOneCompetition)
  .patch(
    // authController.isLoggedIn,
    generalController.uploadCompetitionImages,
    generalController.resizeCompetitionImages,
    generalController.updateCompetition
  )
  .delete(
    // authController.isLoggedIn,
    generalController.deleteCompetition
  );

module.exports = router;
