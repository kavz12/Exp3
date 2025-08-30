import mongoose from "mongoose";

const bioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  about: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
});

export default mongoose.model("Bio", bioSchema);
