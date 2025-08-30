const Home = () => {
    return (
      <section
        id="home"
        className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4"
      >
        <h1 className="text-5xl font-bold mb-4">
          Hello, I'm <span className="text-blue-600">Kaviya</span> 
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl">
          Passionate <span className="font-semibold">Full-Stack Developer</span> specializing in the{" "}
          <span className="font-semibold">MERN Stack</span> with a strong focus on{" "}
          <span className="font-semibold">Cybersecurity</span>. I build secure, scalable, and modern
          web applications while ensuring the best user experience.
        </p>
      </section>
    );
  };
  
  export default Home;
  