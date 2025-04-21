const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  tool: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tool',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'closed'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema);
