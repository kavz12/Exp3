import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [emailError, setEmailError] = useState(""); // ✅ for live validation

  // ✅ Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Live email validation
    if (name === "email") {
      if (!emailRegex.test(value)) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submission if email is invalid
    if (emailError) {
      setResponseMessage("❌ Please fix the errors before submitting.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setResponseMessage("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // clear form
      } else {
        setResponseMessage("❌ Error: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("⚠️ Server error, please try again.");
    }
  };

  return (
    <section id="contact" className="p-10 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-6">Contact Me</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-3 mb-2 border rounded focus:outline-none focus:ring-2 ${
            emailError
              ? "border-red-500 focus:ring-red-500"
              : "focus:ring-blue-500"
          }`}
          required
        />
        {emailError && (
          <p className="text-red-500 text-sm mb-3">{emailError}</p>
        )}

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>

      {/* Show response */}
      {responseMessage && (
        <p className="mt-4 font-medium text-lg">{responseMessage}</p>
      )}

      {/* LinkedIn link */}
      <div className="mt-6">
        <a
          href="https://www.linkedin.com/in/your-linkedin-id"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
        >
          Connect on LinkedIn
        </a>
      </div>
    </section>
  );
};

export default Contact;
