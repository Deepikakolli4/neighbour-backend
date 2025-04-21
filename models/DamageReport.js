const mongoose = require('mongoose');

const damageReportSchema = new mongoose.Schema({
  tool: { type: mongoose.Schema.Types.ObjectId, ref: 'Tool', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('DamageReport', damageReportSchema);