const express = require('express');
const router = express.Router();
const { getChatHistory, addMessage, updateCsMode, getAllChats } = require('../controllers/chatController');

router.get('/', getChatHistory);
router.post('/', addMessage);
router.put('/mode', updateCsMode);
router.get('/all', getAllChats);

module.exports = router;
