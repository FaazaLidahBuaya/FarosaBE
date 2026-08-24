const express = require('express');
const router = express.Router();
const { createUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createUser);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;

