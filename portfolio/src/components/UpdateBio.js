// frontend/src/components/UpdateBio.js
import { useState } from "react";

const UpdateBio = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    about: "",
    email: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("✅ Bio created!");
        setFormData({ name: "", role: "", about: "", email: "", location: "" });
      } else {
        const err = await res.json();
        alert("❌ " + err.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow rounded max-w-md mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold mb-4">Add Bio</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="text"
        name="role"
        value={formData.role}
        onChange={handleChange}
        placeholder="Role"
        className="w-full p-2 border rounded mb-2"
        required
      />
      <textarea
        name="about"
        value={formData.about}
        onChange={handleChange}
        placeholder="About"
        className="w-full p-2 border rounded mb-2"
        required
      ></textarea>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full p-2 border rounded mb-2"
        required
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Add Bio
      </button>
    </form>
  );
};

export default UpdateBio;
