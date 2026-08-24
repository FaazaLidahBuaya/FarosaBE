const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  speed: {
    type: Number, // in Mbps
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Promo', 'Internet', 'Internet + Movie', 'Internet + Game', 'Internet + TV'],
    required: true
  },
  badge: {
    type: String,
    enum: ['', 'Paling Populer', 'Paling Murah', 'Paling Bervalue'],
    default: ''
  },
  features: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
