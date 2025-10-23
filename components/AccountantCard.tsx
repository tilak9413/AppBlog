// File: AccountantCard.jsx
import React from "react";

const AccountantCard = () => {
  return (
    <div className="w-full max-w-6xl ">
      {/* Main Card */}
      <div className="relative bg-white border rounded-[30px] shadow-md flex flex-col md:flex-row items-center md:items-start overflow-hidden">
        {/* Left Section */}
        <div className="p-8 md:w-1/2 space-y-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            <span className="bg-green-100 text-green-800 text-sm px-4 py-1 rounded-lg font-medium">
              10+ years of experience
            </span>
            <span className="bg-blue-100 text-blue-800 text-sm px-4 py-1 rounded-lg font-medium">
              Advance knowledge
            </span>
            <span className="bg-red-100 text-red-800 text-sm px-4 py-1 rounded-lg font-medium">
              Client-focused
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Senior Accountants
          </h2>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            Free up your in-house CPA team for specialized tasks, and leverage
            the skills of our certified accountants for routine tasks that are
            super-important. Hire certified senior accountants today.
          </p>

          {/* Button */}
          <button className="bg-gray-700 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-800 transition">
            Hire Now
          </button>
        </div>

        {/* Right Section */}
        <div className="relative md:w-1/2 flex justify-center items-center p-6">
          {/* SVG Curve */}
          <svg
            className="absolute right-0 top-0 w-full h-full md:w-[300px] md:h-[300px]"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 50C150 50 250 150 250 250"
              stroke="#BFBFBF"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
          </svg>

          {/* Image */}
          <img
            src="https://cdn.prod.website-files.com/6718c309cc349b579872ddbb/6732edefdff39f1fc7a861c7_slider_img-1.webp"
            alt="Accountant"
            className="relative w-64  object-cover z-10 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountantCard;
