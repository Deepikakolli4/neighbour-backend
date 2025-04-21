const Reservation = require('../models/Reservation');

// Service to get user reservations
const getUserReservations = async (userId) => {
  try {
    const reservations = await Reservation.find({ user: userId }).populate('tool');
    return reservations;
  } catch (err) {
    throw new Error('Error fetching reservations');
  }
};

// Service to get upcoming reservations (reminders)
const getUpcomingReservations = async (userId) => {
  try {
    const today = new Date();
    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);

    const reservations = await Reservation.find({
      user: userId,
      startDate: { $gte: today, $lte: threeDaysFromNow },
    }).populate('tool');
    return reservations;
  } catch (err) {
    throw new Error('Error fetching reminders');
  }
};

// Service to create a reservation
const createReservation = async (userId, toolId, startDate, endDate) => {
  try {
    const reservation = new Reservation({
      tool: toolId,
      user: userId,
      startDate,
      endDate,
    });
    await reservation.save();
    return reservation;
  } catch (err) {
    throw new Error('Error creating reservation');
  }
};

module.exports = {
  getUserReservations,
  getUpcomingReservations,
  createReservation,
};
