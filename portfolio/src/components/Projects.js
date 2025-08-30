import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import AddProject from "./AddProject";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // ✅ Fetch projects from backend API
  const fetchProjects = () => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="p-10 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-6">Projects</h2>

      {loading && <p>Loading projects...</p>}
      {err && <p className="text-red-600">Error: {err}</p>}

      {/* ✅ Add Project Form */}
      <div className="max-w-lg mx-auto mb-10">
        <AddProject onProjectAdded={fetchProjects} />
      </div>

      {/* ✅ Project List */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {projects.map((proj) => (
          <div
            key={proj._id}
            className="bg-white p-5 shadow-lg rounded-lg hover:shadow-xl transition text-left"
          >
            <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
            <p className="text-gray-600 mb-4">{proj.description}</p>

            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-900 transition"
              >
                <FaGithub size={18} />
                View on GitHub
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
