const ActivityLog = require('../models/ActivityLog');

const logActivity = async (userId, action, target, details) => {
  try {
    if (userId) {
      await ActivityLog.create({ user: userId, action, target, details });
    }
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

module.exports = logActivity;

