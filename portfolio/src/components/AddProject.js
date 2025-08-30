import { useState } from "react";

const AddProject = ({ onProjectAdded }) => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    link: "",
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });

      if (res.ok) {
        alert("✅ Project added!");
        setProject({ title: "", description: "", link: "" });

        // 🔄 Refresh list in Projects.js
        if (onProjectAdded) onProjectAdded();
      } else {
        alert("❌ Failed to add project");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow rounded max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Add Project</h2>
      <input
        type="text"
        name="title"
        value={project.title}
        onChange={handleChange}
        placeholder="Project Title"
        className="w-full p-2 border rounded mb-2"
        required
      />
      <textarea
        name="description"
        value={project.description}
        onChange={handleChange}
        placeholder="Project Description"
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="text"
        name="link"
        value={project.link}
        onChange={handleChange}
        placeholder="Project Link (GitHub/Live Demo)"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Project
      </button>
    </form>
  );
};

export default AddProject;
