const mongoose = require('mongoose');
const StaffMessage = require('../models/StaffMessage');
const User = require('../models/User');

exports.getMessages = async (req, res) => {
  try {
    const { userId, otherId } = req.query;
    if (!userId || !otherId) return res.json([]);
    
    // Mark messages as read
    await StaffMessage.updateMany(
      { sender: otherId, receiver: userId, isRead: false },
      { $set: { isRead: true } }
    );

    const messages = await StaffMessage.find({
      $or: [
        { sender: userId, receiver: otherId },
        { sender: otherId, receiver: userId }
      ]
    }).populate('sender', 'name role').sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getUnreadCounts = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.json([]);
    
    const unreadStats = await StaffMessage.aggregate([
      { $match: { receiver: new mongoose.Types.ObjectId(userId), isRead: false } },
      { $group: { _id: '$sender', count: { $sum: 1 }, lastMessage: { $last: '$text' }, time: { $last: '$createdAt' } } }
    ]);
    
    res.json(unreadStats);
  } catch (error) {
    console.error("Unread stats error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
    const newMessage = new StaffMessage({ sender: senderId, receiver: receiverId, text });
    await newMessage.save();
    const populatedMessage = await newMessage.populate('sender', 'name role');
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
