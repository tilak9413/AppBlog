"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";

// --- Service Data ---
const serviceCategories = {
  "Business Owners": [
    { title: "Accounting Outsourcing Services", desc: "CPAs' Go-to firm for all accounting needs.", icon: "🏦" },
    { title: "Outsourced Tax Preparation", desc: "Keep Your Busy Tax Preparers on Support.", icon: "🧾" },
    { title: "Accounting Software Consulting", desc: "Helping CPAs use their ideal accounting software.", icon: "💻" },
    { title: "Virtual CFO", desc: "Reliable Virtual CFO Solutions.", icon: "🧑‍💼" },
    { title: "Bookkeeping Services", desc: "Expert and Bookkeeping at Your Service.", icon: "📘" },
    { title: "AR & AP Management", desc: "Comprehensive AR & AP Management Services.", icon: "📄" },
    { title: "Payroll Management", desc: "Streamline Your CPA's Payroll Processes.", icon: "💵" },
    { title: "Xero & QuickBooks Accounting", desc: "Specialized Xero & QuickBooks Services.", icon: "🪙" },
  ],
  "Valuation Services": [
    { title: "Valuation Consulting", desc: "Expert assessment for M&A and regulatory needs.", icon: "⚖️" },
    { title: "Due Diligence Support", desc: "Thorough financial investigation for acquisitions.", icon: "🔍" },
  ],
  "Advisory Services": [
    { title: "Audit Support Services", desc: "Get Top-Notch Audit Support Service.", icon: "✅" },
    { title: "Year-End Services", desc: "Smoothly Transition Into the New Fiscal Year.", icon: "📅" },
    { title: "Offshore Staffing for CPA Firms", desc: "Cost-Effective Staffing Solutions for CPAs.", icon: "💼" },
    { title: "Outsourced Finance and Accounting Services", desc: "Reliable Outsourced Financial Services.", icon: "📈" },
    { title: "Cost & Operation Analysis", desc: "Drive Profitability & Make Data-Backed Decisions.", icon: "📉" },
    { title: "Preparation Of Financial Statements", desc: "Providing A Reliable Financial Statements for Qs.", icon: "📝" },
    { title: "Outsource Bookkeeping & Accounting Services for CPAs", desc: "Efficient CPA Assistance.", icon: "🤝" },
  ],
};

// --- Dropdown Item ---
const DropdownItem = ({ title, desc, icon }: { title: string; desc: string; icon: string }) => (
  <Link
    href={`/services/${title.toLowerCase().replace(/\s/g, "-")}`}
    className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition duration-150 group"
  >
    <div className="w-8 h-8 flex items-center justify-center text-xl text-green-600 border border-gray-300 rounded-full flex-shrink-0 mt-1">
      {icon}
    </div>
    <div className="ml-4">
      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">{title}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  </Link>
);

// --- Header Component ---
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof typeof serviceCategories>("Business Owners");

  const List = [
    { id: "1", link: "Home", path: "/" },
    { id: "2", link: "About Us", path: "/about" },
    { id: "3", link: "Services", path: "/services", isDropdown: true },
    { id: "4", link: "Blogs", path: "/blogs" },
    { id: "5", link: "Contact Us", path: "/Contactus" },
  ];

  const CustomButton = ({ text }: { text: string }) => (
    <button className="px-4 py-2 bg-slate-700 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition">
      {text}
    </button>
  );

  return (
    <header onMouseLeave={()=>setServicesOpen(false)} className=" w-full bg-white z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 relative">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <h4 className="text-xl font-bold text-slate-800">STANFOX</h4>
          <p className="text-xs text-gray-500 hidden sm:block">YOUR OUTSOURCE PARTNER</p>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {List.map((item) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => item.isDropdown && setServicesOpen(true)}
            >
              <Link
                href={item.path}
                className="text-gray-700 font-medium hover:text-blue-600 flex items-center gap-1"
              >
                {item.link}
                {item.isDropdown && (
                 <MdExpandMore />
                )}
              </Link>

              {/* Mega Menu */}
              {item.isDropdown && servicesOpen && (

                <div
            className="absolute top-full right-0 mt-2 bg-white shadow-2xl rounded-xl p-6 border border-gray-100 z-50 flex"
                  style={{ width: "900px", maxWidth: "95vw" }} // adjust width as needed
                >
                  {/* Tabs */}
                  <div className="w-1/4 pr-4 border-r border-gray-200 space-y-2">
                    {Object.keys(serviceCategories).map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveTab(category as keyof typeof serviceCategories)}
                        className={`w-full text-left py-3 px-3 rounded-lg text-sm font-medium transition-colors duration-200 ${activeTab === category
                            ? "bg-green-100 text-green-700 border-l-4 border-green-500"
                            : "text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* Services Grid */}
                  <div className="w-3/4 pl-6 grid grid-cols-2 gap-x-4 gap-y-6">
                    {serviceCategories[activeTab].map((item, index) => (
                      <DropdownItem key={index} {...item} />
                    ))}
                  </div>
                </div>
              )}

            </div>
          ))}
          <CustomButton text="Book A Call" />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Mobile Menu */}
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
            <CustomButton text="Book A Call" />
          </div>
        )}
      </div>
    </header>
  );
}
