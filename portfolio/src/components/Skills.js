import { useEffect, useState } from "react";
import AddSkill from "./AddSkill";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  // ✅ Fetch skills from backend API
  const fetchSkills = () => {
    fetch("http://localhost:5000/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error("Error fetching skills:", err));
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Certificates (Static)
  const certificates = [
    {
      name: "React.js Certificate",
      file: "/certificates/react-cert.pdf",
      preview: "/certificates/react-cert.jpg",
    },
    {
      name: "Node.js Certificate",
      file: "/certificates/node-cert.pdf",
      preview: "/certificates/node-cert.jpg",
    },
    {
      name: "Cybersecurity Certificate",
      file: "/certificates/cyber-cert.pdf",
      preview: "/certificates/cyber-cert.jpg",
    },
  ];

  return (
    <section id="skills" className="p-10 bg-white text-center">
      <h2 className="text-4xl font-bold mb-6">Skills</h2>

      {/* ✅ Skills Section (Dynamic from DB) */}
      <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto mb-10">
        {skills.length > 0 ? (
          skills.map((skill, i) => (
            <span
              key={i}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
              {skill.icon ? <i className={skill.icon}></i> : "🔧"}
              {skill.name}
            </span>
          ))
        ) : (
          <p>Loading skills...</p>
        )}
      </div>

      {/* ✅ AddSkill Form (updates DB + refreshes list) */}
      <div className="max-w-lg mx-auto mb-12">
        <AddSkill onSkillAdded={fetchSkills} />
      </div>

      {/* Certificates Section */}
      <h3 className="text-2xl font-semibold mb-6">Certificates</h3>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {certificates.map((cert, i) => (
          <div
            key={i}
            className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <img
              src={cert.preview}
              alt={cert.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h4 className="text-lg font-medium mb-2">{cert.name}</h4>
            <a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              View Certificate
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
