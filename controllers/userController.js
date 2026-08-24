const User = require('../models/User');
const bcrypt = require('bcryptjs');
const logActivity = require('../utils/logger');

const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email sudah terdaftar' });
    
    // UsageType and address default to not needed for employees, but we can set them as N/A
    const user = await User.create({
      name, email, password, phone, role,
      usageType: 'bisnis', address: 'Office'
    });
    await logActivity(req.user ? req.user._id : null, 'MEMBUAT', 'Data Pegawai', `Menambahkan pegawai baru: ${name} (${role})`);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, phone, role, password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    if (role) user.role = role;
    
    if (password) {
      user.password = password; // Will be hashed by pre-save hook
    }
    await user.save();
    await logActivity(req.user ? req.user._id : null, 'MENGUBAH', 'Data Pegawai', `Mengedit data pegawai: ${user.name}`);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    await user.deleteOne();
    await logActivity(req.user ? req.user._id : null, 'MENGHAPUS', 'Data Pegawai', `Menghapus pegawai: ${user.name}`);
    res.json({ message: 'User dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createUser, updateUser, deleteUser };

