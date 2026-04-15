import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#2f4270] bg-[#142449]/50 px-4 py-2">
          <span className="text-lg">✨</span>
          <span className="text-sm font-semibold text-[#699cff]">
            Connect & Grow.
          </span>
        </div>

        {/* Main heading */}
        <h1 className="cc-title mb-6 text-5xl font-extrabold text-white md:text-6xl">
          Connect with developers, and grow together.
        </h1>

        {/* Subtitle */}
        <p className="mb-10 text-lg text-[#9baad6] md:text-xl">
          A platform where developers can showcase their skills, share their
          thoughts, and find the right collaborators to build amazing projects
          together.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/login")}
          className="mb-20 rounded-full cc-primary-btn px-8 py-3 text-lg font-bold text-white transition-all  hover:shadow-lg hover:shadow-[#699cff]/30"
        >
          Get Started
        </button>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-[#2f4270] bg-[#0f1f38]/50 p-8 backdrop-blur-sm transition-all hover:border-[#699cff]/50 hover:bg-[#142449]/50">
            <div className="mb-4 flex justify-center text-4xl">✨</div>
            <h3 className="mb-3 text-xl font-bold text-white">
              Showcase Your Skills
            </h3>
            <p className="text-[#9baad6]">
              Highlight your skills, tech stack, and projects to stand out and
              get noticed by other developers.
            </p>
          </div>

          <div className="rounded-xl border border-[#2f4270] bg-[#0f1f38]/50 p-8 backdrop-blur-sm transition-all hover:border-[#699cff]/50 hover:bg-[#142449]/50">
            <div className="mb-4 flex justify-center text-4xl">💬</div>
            <h3 className="mb-3 text-xl font-bold text-white">
              Connect & Chat
            </h3>
            <p className="text-[#9baad6]">
              Send connection requests to developers you’re interested in and
              chat with them in real time.
            </p>
          </div>

          <div className="rounded-xl border border-[#2f4270] bg-[#0f1f38]/50 p-8 backdrop-blur-sm transition-all hover:border-[#699cff]/50 hover:bg-[#142449]/50">
            <div className="mb-4 flex justify-center text-4xl">❤️</div>
            <h3 className="mb-3 text-xl font-bold text-white">
              Find Project Partners
            </h3>
            <p className="text-[#9baad6]">
              Discover like-minded people and collaborate with others who want
              to work on similar projects.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
