const express = require('express');
const router = express.Router();
const { getPackages, addPackage, updatePackage, deletePackage } = require('../controllers/packageController');

router.get('/', getPackages);
router.post('/', addPackage);
router.put('/:id', updatePackage);
router.delete('/:id', deletePackage);

module.exports = router;
