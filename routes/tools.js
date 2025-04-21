const express = require('express');
const toolService = require('../services/toolService');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Tool = require('../models/Tool'); // Ensure Tool model is correctly imported

const router = express.Router();

// Get all tools
router.get('/', async (req, res) => {
  try {
    const tools = await Tool.find(); // Fetch tools from the database
    res.json(tools); // Ensure the response includes the `image` field
  } catch (err) {
    console.error('Error fetching tools:', err);
    res.status(500).json({ message: 'Failed to fetch tools' });
  }
});

// Get a specific tool by ID
router.get('/:id', async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id); // Fetch tool by ID
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    res.json(tool);
  } catch (err) {
    console.error('Error fetching tool:', err);
    res.status(500).json({ message: 'Failed to fetch tool' });
  }
});

// Add tool (Admin only)
router.post('/', auth, admin, async (req, res) => {
  const { name, description, category, imageUrl } = req.body;
  try {
    const tool = await toolService.addTool(name, description, category, imageUrl);
    res.status(201).json(tool);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete tool (Admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const tool = await toolService.deleteTool(req.params.id);
    res.json({ message: 'Tool deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reserve a tool
router.post('/:id/reserve', async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    if (tool.isReserved) {
      return res.status(400).json({ message: 'Tool is already reserved' });
    }

    tool.isReserved = true; // Mark tool as reserved
    await tool.save();

    res.json({ message: 'Tool reserved successfully' });
  } catch (err) {
    console.error('Error reserving tool:', err);
    res.status(500).json({ message: 'Failed to reserve tool' });
  }
});

// Check tool availability
router.get('/:id/availability', async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    res.json({ available: !tool.isReserved }); // Return availability status
  } catch (err) {
    console.error('Error checking availability:', err);
    res.status(500).json({ message: 'Failed to check availability' });
  }
});

module.exports = router;
