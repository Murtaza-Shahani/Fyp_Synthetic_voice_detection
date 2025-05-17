import React from "react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const AboutTeam = () => {
  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading Section */}
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
        <p className="text-lg text-gray-600 mb-12">
          The talented individuals who make everything possible.
        </p>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {/* Team Member 1: Toufeeque Ali */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://via.placeholder.com/150" // Update with actual image
              alt="Toufeeque Ali"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-900">Toufeeque Ali</h3>
            <p className="text-lg text-gray-500 mb-4">AI Engineer</p>
            <p className="text-base text-gray-600 mb-4">
              Passionate about artificial intelligence and its transformative power.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.linkedin.com"
                className="text-gray-600 hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com"
                className="text-gray-600 hover:text-gray-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                className="text-gray-600 hover:text-pink-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Team Member 2: Ghulam Murtaza */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://via.placeholder.com/150" // Update with actual image
              alt="Ghulam Murtaza"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-900">Ghulam Murtaza</h3>
            <p className="text-lg text-gray-500 mb-4">Full Stack Developer with AI Expertise</p>
            <p className="text-base text-gray-600 mb-4">
              A developer with a keen interest in integrating AI to build powerful and scalable systems.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.linkedin.com"
                className="text-gray-600 hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com"
                className="text-gray-600 hover:text-gray-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                className="text-gray-600 hover:text-pink-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Team Values Section */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h3>
          <p className="text-lg text-gray-600">
            We believe in collaboration, innovation, and a constant drive to push the boundaries of technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutTeam;
