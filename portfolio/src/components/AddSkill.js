import { useState } from "react";

const AddSkill = () => {
  const [skill, setSkill] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: skill }),
      });

      if (res.ok) {
        alert("✅ Skill added successfully!");
        setSkill("");
      } else {
        alert("❌ Failed to add skill");
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
      <h2 className="text-2xl font-bold mb-4">Add Skill</h2>
      <input
        type="text"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        placeholder="Enter Skill"
        className="w-full p-2 border rounded mb-4"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Skill
      </button>
    </form>
  );
};

export default AddSkill;
