const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.route('/').get(viewController.getMatura);

module.exports = router;