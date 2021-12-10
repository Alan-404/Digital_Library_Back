const express = require('express');
const router = express.Router();
const AdController = require('../Controllers/AdController');

router.post('/insert', AdController.insertAd);
router.get('/', AdController.getAllAd);

module.exports = router;