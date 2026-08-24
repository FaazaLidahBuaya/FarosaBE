const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

// Seed akun pegawai default
const seedEmployees = async () => {
  try {
    const employees = [
      { name: 'Admin Farosa', email: 'admin@farosa.com', password: 'admin123', phone: '08110001111', usageType: 'bisnis', role: 'owner' },
      { name: 'Siti Manager', email: 'manager@farosa.com', password: 'manager123', phone: '08110002222', usageType: 'bisnis', role: 'manager' },
      { name: 'Budi CS', email: 'cs@farosa.com', password: 'cs123456', phone: '08110003333', usageType: 'bisnis', role: 'cs' },
    ];

    for (const emp of employees) {
      const exists = await User.findOne({ email: emp.email });
      if (!exists) {
        await User.create(emp);
        console.log(`👤 Akun ${emp.role} (${emp.email}) berhasil dibuat`);
      }
    }
  } catch (error) {
    console.error('Gagal seed akun pegawai:', error.message);
  }
};

// @desc    Register user baru
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, usageType, address, location } = req.body;

    // Cek user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // Buat user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      usageType,
      address,
      location
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        usageType: user.usageType,
        address: user.address,
        location: user.location,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Data user tidak valid' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari email
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        location: user.location,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Email atau password salah' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get data user profil
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('ownedPackages');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users (for admin dashboard)
// @route   GET /api/auth/users
// @access  Admin/Owner
const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    let query = {};
    if (role) query.role = role;
    const users = await User.find(query).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password lama salah" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password berhasil diubah" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  changePassword,
  seedEmployees,
  registerUser,
  loginUser,
  getMe,
  getAllUsers
};