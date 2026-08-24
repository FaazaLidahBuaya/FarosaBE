const ActivityLog = require('../models/ActivityLog');

const getLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate('user', 'name role')
      .sort({ createdAt: -1 })
      .limit(200);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLogs };

