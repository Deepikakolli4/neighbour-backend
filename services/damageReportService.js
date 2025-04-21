const DamageReport = require('../models/DamageReport');

// Service to get user damage reports
const getUserDamageReports = async (userId) => {
  try {
    const reports = await DamageReport.find({ user: userId }).populate('tool');
    return reports;
  } catch (err) {
    throw new Error('Error fetching reports');
  }
};

// Service to create a new damage report
const createDamageReport = async (userId, toolId, description) => {
  try {
    const report = new DamageReport({
      tool: toolId,
      user: userId,
      description,
    });
    await report.save();
    return report;
  } catch (err) {
    throw new Error('Error creating report');
  }
};

module.exports = {
  getUserDamageReports,
  createDamageReport,
};
