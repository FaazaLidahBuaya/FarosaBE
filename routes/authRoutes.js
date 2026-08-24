const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, getAllUsers, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);
router.get('/users', getAllUsers);

module.exports = router;