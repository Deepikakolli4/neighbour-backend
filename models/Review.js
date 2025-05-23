const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  tool: 
  { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Tool', required: true 
  },
  user: 
  { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true 
  },
  rating: { 
   type: Number, 
   required: true,
    min: 1,
     max: 5 },
  comment:
   { 
    type: String,
     required: true
   },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);