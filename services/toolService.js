const Tool = require('../models/Tool');

// Service to get all tools
const getAllTools = async () => {
  try {
    const tools = await Tool.find();
    return tools;
  } catch (err) {
    throw new Error('Error fetching tools');
  }
};

// Service to add a new tool
const addTool = async (name, description, category, imageUrl) => {
  try {
    const tool = new Tool({ name, description, category, imageUrl });
    await tool.save();
    return tool;
  } catch (err) {
    throw new Error('Error adding tool');
  }
};

// Service to delete a tool
const deleteTool = async (id) => {
  try {
    const tool = await Tool.findByIdAndDelete(id);
    if (!tool) throw new Error('Tool not found');
    return tool;
  } catch (err) {
    throw new Error('Error deleting tool');
  }
};

module.exports = {
  getAllTools,
  addTool,
  deleteTool,
};
