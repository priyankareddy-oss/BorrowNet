const Item = require("../models/Item");

// Add Item
const addItem = async (req, res) => {
  try {
    const { name, description, category, owner } = req.body;

    const item = new Item({
      name,
      description,
      category,
      owner,
    });

    await item.save();

    res.status(201).json({
      message: "Item Added Successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addItem };