const express = require('express');
const router = express.Router();
const { getMessages, addMessage, getUnreadCounts } = require('../controllers/staffChatController');

router.get('/unread', getUnreadCounts);
router.get('/', getMessages);
router.post('/', addMessage);

module.exports = router;
