const express = require('express');
const generalController = require('./../controllers/generalController');
const authController = require('./../controllers/authController');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router
  .route('/')
  .get(viewController.getAllPartners)
  .post(
    // authController.isLoggedIn,
    generalController.createPartner
  );
  router.route('/api').get(generalController.getAllPartners);
router
  .route('/:id')
  .get(generalController.getOnePartner)
  .patch(
    // authController.isLoggedIn,
    generalController.uploadPartnerImage,
    generalController.resizePartnerImage,
    generalController.updatePartner
  )
  .delete(
    // authController.isLoggedIn,
    generalController.deletePartner
  );

module.exports = router;