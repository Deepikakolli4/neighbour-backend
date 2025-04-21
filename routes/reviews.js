const express = require('express');
const reviewService = require('../services/reviewService');
const auth = require('../middleware/auth');
const Review = require('../models/Review'); // Import Review model directly for tool-specific reviews

const router = express.Router();

// Get user reviews
router.get('/', auth, async (req, res) => {
  try {
    const reviews = await reviewService.getUserReviews(req.user.id);
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching user reviews:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get reviews for a specific tool
router.get('/tool/:toolId', async (req, res) => {
  try {
    const reviews = await Review.find({ tool: req.params.toolId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching tool reviews:', err);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

// Create review
router.post('/', auth, async (req, res) => {
  const { tool, rating, comment } = req.body;
  try {
    const review = await reviewService.createReview(req.user.id, tool, rating, comment);
    await review.populate('user', 'name'); // Populate user name for response
    res.status(201).json(review);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;