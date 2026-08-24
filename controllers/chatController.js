const Chat = require('../models/Chat');

exports.getChatHistory = async (req, res) => {
  try {
    const { userId, guestId } = req.query;
    let chat;
    if (userId) {
      chat = await Chat.findOne({ userId });
    } else if (guestId) {
      chat = await Chat.findOne({ guestId });
    }
    
    if (!chat) {
      return res.json({ messages: [], csMode: false });
    }
    res.json({ messages: chat.messages, csMode: chat.csMode });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addMessage = async (req, res) => {
  try {
    const { userId, guestId, sender, text } = req.body;
    let chat;

    if (userId) {
      chat = await Chat.findOne({ userId });
      if (!chat) {
        chat = new Chat({ userId, messages: [] });
      }
    } else if (guestId) {
      chat = await Chat.findOne({ guestId });
      if (!chat) {
        chat = new Chat({ guestId, messages: [] });
      }
    } else {
      return res.status(400).json({ message: 'User ID or Guest ID is required' });
    }

    chat.messages.push({ sender, text });
    await chat.save();
    
    const addedMessage = chat.messages[chat.messages.length - 1];
    res.status(201).json({ addedMessage, csMode: chat.csMode });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCsMode = async (req, res) => {
  try {
    const { userId, guestId, csMode } = req.body;
    let chat;
    if (userId) {
      chat = await Chat.findOne({ userId });
    } else if (guestId) {
      chat = await Chat.findOne({ guestId });
    }
    
    if (chat) {
      chat.csMode = csMode;
      await chat.save();
      return res.json({ success: true, csMode: chat.csMode });
    }
    res.status(404).json({ message: 'Chat not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find().populate('userId', 'name email phone address');
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
