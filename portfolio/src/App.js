import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // JWT stored in localStorage
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // check authentication status on reload
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default route → go to login */}
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Signup route */}
        <Route path="/signup" element={<Signup />} />

        {/* Portfolio (Protected) */}
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <div className="pt-16">
                  <section id="home">
                    <Home />
                  </section>
                  <section id="about">
                    <About />
                  </section>
                  <section id="projects">
                    <Projects />
                  </section>
                  <section id="skills">
                    <Skills />
                  </section>
                  <section id="contact">
                    <Contact />
                  </section>
                </div>
              </>
            </ProtectedRoute>
          }
        />

        {/* Example dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
