const express = require('express');
const Reservation = require('../models/Reservation');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new reservation
router.post('/', auth, async (req, res) => {
  try {
    const { tool, startDate, endDate } = req.body;

    if (!tool || !startDate || !endDate) {
      return res.status(400).json({ message: 'Tool, start date, and end date are required' });
    }

    // Check for overlapping reservations
    const overlappingReservations = await Reservation.find({
      tool,
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) },
        },
      ],
    });

    if (overlappingReservations.length > 0) {
      return res.status(400).json({ message: 'Tool is already reserved for the selected dates' });
    }

    // Create new reservation
    const reservation = new Reservation({
      user: req.user.id,
      tool,
      startDate,
      endDate,
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    console.error('Error creating reservation:', err);
    res.status(500).json({ message: 'Failed to create reservation' });
  }
});

// Get reservations for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id })
      .populate('tool', 'name')
      .sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ message: 'Failed to fetch reservations' });
  }
});

// Get unavailable dates for a specific tool
router.get('/unavailable/:toolId', async (req, res) => {
  try {
    const reservations = await Reservation.find({
      tool: req.params.toolId,
      status: { $in: ['pending', 'active'] },
    });

    const unavailableDates = reservations.flatMap((res) => {
      const dates = [];
      let currentDate = new Date(res.startDate);
      const endDate = new Date(res.endDate);
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate).toISOString());
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    });

    res.json(unavailableDates);
  } catch (err) {
    console.error('Error fetching unavailable dates:', err);
    res.status(500).json({ message: 'Failed to fetch unavailable dates' });
  }
});

module.exports = router;