import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white shadow z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">My Portfolio</h1>
        <div className="space-x-6">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>

          {/* ✅ New Auth Links */}
          <Link to="/signup" className="text-blue-600 font-medium">
            Signup
          </Link>
          <Link to="/login" className="text-green-600 font-medium">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
