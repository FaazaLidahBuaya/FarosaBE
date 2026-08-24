const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama wajib diisi']
  },
  email: {
    type: String,
    required: [true, 'Email wajib diisi'],
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Silakan isi email yang valid']
  },
  password: {
    type: String,
    required: [true, 'Password wajib diisi'],
    minlength: 6,
    select: false
  },
  phone: {
    type: String,
    required: [true, 'Nomor HP wajib diisi']
  },
  usageType: {
    type: String,
    enum: ['rumahan', 'apartemen', 'bisnis'],
    required: [true, 'Kebutuhan wajib diisi']
  },
  address: {
    type: String,
    default: ''
  },
  location: {
    lat: { type: Number, default: null },
    lng: { type: Number, default: null }
  },
  role: {
    type: String,
    enum: ['user', 'cs', 'manager', 'owner', 'admin'],
    default: 'user'
  },
  ownedPackages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Enkripsi password sebelum save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method untuk membandingkan password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);