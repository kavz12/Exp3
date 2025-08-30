import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  techStack: [String], // Array of technologies
  link: { type: String }, // GitHub or Live demo link
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
