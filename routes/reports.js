const express = require('express');
const damageReportService = require('../services/damageReportService');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user damage reports
router.get('/', auth, async (req, res) => {
  try {
    const reports = await damageReportService.getUserDamageReports(req.user.id);
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create damage report
router.post('/', auth, async (req, res) => {
  const { tool, description } = req.body;
  try {
    const report = await damageReportService.createDamageReport(req.user.id, tool, description);
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
