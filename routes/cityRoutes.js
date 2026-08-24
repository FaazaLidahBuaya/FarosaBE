const express = require('express');
const router = express.Router();
const { getCities, addCity, deleteCity } = require('../controllers/cityController');

router.get('/', getCities);
router.post('/', addCity);
router.delete('/:id', deleteCity);

module.exports = router;
