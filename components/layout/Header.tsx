"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import CustomButton from "../ui/customButtom/Button";

const List = [
  { id: "1", link: "Home", path: "/home" },
  { id: "2", link: "About Us", path: "/about" },
  { id: "3", link: "Services", path: "/services" },
  { id: "4", link: "Blogs", path: "/blogs" },
  { id: "5", link: "Contact Us", path: "/contactus" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white p-4 flex justify-between items-center shadow-md relative">
      {/* Logo */}
      <h4 className="text-2xl font-bold text-blue-600">BlogApp</h4>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-6">
        {List.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            {item.link}
          </Link>
        ))}
        <CustomButton text="Book A Call" variant="dark" />
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-800"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-4 py-6 md:hidden z-50">
          {List.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="text-gray-700 hover:text-blue-600 text-lg font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {item.link}
            </Link>
          ))}
          <CustomButton text="Book A Call" variant="dark" />
        </div>
      )}
    </header>
  );
}
