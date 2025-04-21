const QRCode = require('qrcode');
const Reservation = require('../models/Reservation');

// Service to generate QR code for a reservation
const generateQRCodeForReservation = async (reservationId) => {
  const reservation = await Reservation.findById(reservationId).populate('tool');
  if (!reservation) throw new Error('Reservation not found');

  const qrData = `http://localhost:3000/reservations/${reservation._id}`;
  const qrCode = await QRCode.toDataURL(qrData);
  const base64Data = qrCode.split(',')[1]; // Extract base64 data

  return Buffer.from(base64Data, 'base64');
};

module.exports = {
  generateQRCodeForReservation,
};
