import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, default: "Beginner" }, // Example: Beginner, Intermediate, Expert
});

export default mongoose.model("Skill", skillSchema);
