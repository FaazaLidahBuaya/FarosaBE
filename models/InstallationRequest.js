const mongoose = require('mongoose');

const installationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  fullAddress: {
    type: String,
    required: true
  },
  selectedPackage: {
    type: String,
    required: true
  },
  packagePrice: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Dikonfirmasi', 'Survey Lokasi', 'Proses Pasang', 'Aktif', 'Ditolak'],
    default: 'Pending'
  },
  installationDate: {
    type: Date,
    default: null
  },
  assignedTeam: {
    type: String,
    default: ''
  },
  confirmedBy: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('InstallationRequest', installationSchema);
