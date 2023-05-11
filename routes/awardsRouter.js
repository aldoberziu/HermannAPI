const express = require('express');
const generalController = require('../controllers/generalController');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(viewController.getAllAwards)
  .post(authController.isLoggedIn, generalController.createAward);

router.route('/api').get(generalController.getAllAwards);
router.route('/:slug').get(viewController.getOneAward);
router
  .route('/:id')
  .get(generalController.getOneAward)
  .patch(
    authController.isLoggedIn,
    generalController.uploadAwardImages,
    generalController.resizeAwardImages,
    generalController.updateAward
  )
  .delete(authController.isLoggedIn, generalController.deleteAward);

module.exports = router;
