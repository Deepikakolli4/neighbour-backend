require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const toolRoutes = require('./routes/tools');
const authRoutes = require('./routes/auth');
const reservationRoutes = require('./routes/reservations');
const reportRoutes = require('./routes/reports');
const reviewRoutes = require('./routes/reviews');
const qrRoutes = require('./routes/qr');

const app = express();

// Middleware
app.use(cors({
  origin: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });

// Routes
app.use('/api/tools', toolRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/qr', qrRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});
app.get('/', (req, res) => {
  res.json({ message: 'Welcome' });
}); 
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API' });
}); 
// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));