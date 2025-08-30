import { useEffect, useState } from "react";

const About = () => {
  const [bio, setBio] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch bio
  useEffect(() => {
    fetch("http://localhost:5000/api/bio")
      .then((res) => res.json())
      .then((data) => {
        setBio(data);
        setFormData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Update Bio
  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/bio/${bio._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update");
      const updated = await res.json();
      setBio(updated);
      setEditMode(false);
      alert("✅ Bio updated!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // ✅ Delete Bio
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/bio/${bio._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setBio(null);
      alert("✅ Bio deleted!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  if (!bio) return <p className="text-center mt-10">No bio found.</p>;

  return (
    <section id="about" className="p-10 bg-white text-center">
      <h2 className="text-4xl font-bold mb-4">About Me</h2>

      {editMode ? (
        <div className="max-w-md mx-auto">
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="w-full p-2 border mb-2"
            placeholder="Name"
          />
          <input
            type="text"
            name="role"
            value={formData.role || ""}
            onChange={handleChange}
            className="w-full p-2 border mb-2"
            placeholder="Role"
          />
          <textarea
            name="about"
            value={formData.about || ""}
            onChange={handleChange}
            className="w-full p-2 border mb-2"
            placeholder="About"
          />
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full p-2 border mb-2"
            placeholder="Email"
          />
          <input
            type="text"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            className="w-full p-2 border mb-2"
            placeholder="Location"
          />

          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
          <strong>Name:</strong> {bio.name} <br />
          <strong>Role:</strong> {bio.role} <br />
          <strong>About:</strong> {bio.about} <br />
          <strong>Email:</strong> {bio.email} <br />
          <strong>Location:</strong> {bio.location}
        </p>
      )}

      {!editMode && (
        <div className="mt-4">
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </section>
  );
};

export default About;
