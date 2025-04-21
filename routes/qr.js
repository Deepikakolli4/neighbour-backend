const express = require('express');
const qrcodeService = require('../services/qrcodeService');

const router = express.Router();

// Generate QR code for reservation
router.get('/reservation/:id', async (req, res) => {
  try {
    const qrCodeBuffer = await qrcodeService.generateQRCodeForReservation(req.params.id);
    res.setHeader('Content-Type', 'image/png');
    res.send(qrCodeBuffer);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
