// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const authRoutes = require('./routes/auth');
// const reviewRoutes = require('./routes/reviews');
// const reportRoutes = require('./routes/reports');
// const qrRoutes = require('./routes/qr');
const toolsRoutes = require('./routes/tools');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 8000;

// // Middleware
// app.use(cors({ origin: 'http://localhost:3000' })); // Replace with your frontend's URL
// app.use(express.json()); // Ensure this middleware is present

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/reviews', reviewRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api/qr', qrRoutes);
app.use('/api/tools', toolsRoutes);

app.use('/uploads', express.static('uploads')); // Serve static files from the 'uploads' directory

// // Error-handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'An error occurred', error: err.message });
// });

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error('MongoDB connection error:', err));
