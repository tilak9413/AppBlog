"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const industryCards = [
  {
    icon: "/icons/house.svg",
    title: "Real Estate",
    description:
      "From residential to commercial, our proficient team provides diverse real-estate accounting services.",
  },
  {
    icon: "/icons/plus-sign.svg",
    title: "Healthcare",
    description:
      "Healthcare accounting demands specialized care – trust it to our expert financial advisors.",
  },
  {
    icon: "/icons/restaurant.svg",
    title: "Hotel & Restaurant",
    description:
      "We help hotels and restaurants maintain clean financial books and improve operational efficiency.",
  },
  {
    icon: "/icons/retail.svg",
    title: "Retail & Wholesale",
    description:
      "Help your client expand globally with finesse, while we manage their accounts & taxes precisely.",
  },
  {
    icon: "/icons/shipping.svg",
    title: "Shipping & Logistics",
    description:
      "Facilitate global supply chain efficiency while we manage accounts and complex freight taxation.",
  },
  {
    icon: "/icons/tech.svg",
    title: "Technology",
    description:
      "Supporting innovative tech startups and established companies with tailored financial strategies.",
  },
];

const IndustriesSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto text-center mb-10 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-4"
        >
          Accounting & Bookkeeping Expertise Across Industries
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
        >
          We support a diverse range of industries with tailored accounting
          solutions designed to meet specific sector needs.
        </motion.p>
      </div>

      {/* Grid layout - responsive for all devices */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {industryCards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl p-6 sm:p-8 border border-gray-100 flex flex-col items-start text-left hover:border-green-200 transition-all duration-300"
          >
            <div className="p-3 bg-green-50 rounded-full border border-green-100 mb-5 flex items-center justify-center">
              <Image
                src={card.icon}
                alt={card.title}
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
              {card.title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default IndustriesSection;
