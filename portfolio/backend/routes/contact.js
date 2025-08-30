import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// ✅ Email regex (for quick backend validation)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ✅ Get all contact messages
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Create contact message with email validation
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Check required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format before saving
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    res.json({ message: "✅ Contact saved successfully", contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
