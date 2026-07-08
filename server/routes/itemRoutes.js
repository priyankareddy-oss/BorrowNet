const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// ADD ITEM
router.post("/add", async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();

    res.json({
      message: "Item added successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL ITEMS
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// BORROW ITEM
router.put("/borrow/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.status = "borrowed";
    await item.save();

    res.json({
      message: "Item Borrowed Successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// RETURN ITEM
router.put("/return/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.status = "available";
    await item.save();

    res.json({
      message: "Item Returned Successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;