const express = require('express');
const router = express.Router();
const installationController = require('../controllers/installationController');

router.post('/', installationController.createRequest);
router.get('/', installationController.getRequests);
router.patch('/:id/status', installationController.updateRequestStatus);
router.patch('/:id/confirm', installationController.confirmRequest);

module.exports = router;
