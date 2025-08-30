import express from "express";
import Bio from "../models/Bio.js";

const router = express.Router();

// ✅ GET bio (just return the first one)
router.get("/", async (req, res) => {
  try {
    const bio = await Bio.findOne().lean();
    res.json(bio || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ CREATE bio (only if not exists)
router.post("/", async (req, res) => {
  try {
    const existing = await Bio.findOne();
    if (existing) {
      return res
        .status(400)
        .json({ message: "Bio already exists. Use PUT to update." });
    }
    const bio = new Bio(req.body);
    await bio.save();
    res.json(bio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ UPDATE bio
router.put("/:id", async (req, res) => {
  try {
    const updated = await Bio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Bio not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ DELETE bio
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Bio.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Bio not found" });
    res.json({ message: "Bio deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
