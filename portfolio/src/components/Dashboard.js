// components/Dashboard.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // redirect if not logged in
      return;
    }

    fetch("http://localhost:5000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <section className="p-10">
      <h2 className="text-3xl font-bold">Portfolio Dashboard</h2>
      {profile ? (
        <div className="mt-4">
          <p>
            Welcome, <strong>{profile.username}</strong> ({profile.email})
          </p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </section>
  );
};

export default Dashboard;
