const Review = require('../models/Review');

// Service to get user reviews
const getUserReviews = async (userId) => {
  try {
    const reviews = await Review.find({ user: userId }).populate('tool');
    return reviews;
  } catch (err) {
    throw new Error('Error fetching reviews');
  }
};

// Service to create a review
const createReview = async (userId, toolId, rating, comment) => {
  try {
    const review = new Review({
      tool: toolId,
      user: userId,
      rating,
      comment,
    });
    await review.save();
    return review;
  } catch (err) {
    throw new Error('Error creating review');
  }
};

module.exports = {
  getUserReviews,
  createReview,
};
