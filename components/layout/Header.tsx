"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import axios from "axios";

interface ServiceItem {
  _id: string;
  heroSection?: { title: string; description: string };
  slug:any
}

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
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loadingServices, setLoadingServices] = useState<boolean>(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        const response = await axios.get('/api/service');
        if (response.status === 200) {
          const result = response.data;
          const data = Array.isArray(result?.data) ? result.data : (Array.isArray(result) ? result : []);
          setServices(data);
        } else {
          setServices([]);
        }
      } catch (e) {
        setServices([]);
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

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
                  {/* Services Grid from API */}
                  <div className="w-full grid grid-cols-2 gap-x-4 gap-y-6">
                    {loadingServices && (
                      <div className="col-span-2 text-center text-gray-500">Loading services...</div>
                    )}
                    {!loadingServices && services.length === 0 && (
                      <div className="col-span-2 text-center text-gray-500">No services available</div>
                    )}
                    {!loadingServices && services.length > 0 && services.map((svc) => (
                      <Link
                        key={svc._id}
                        href={`/services/${svc.slug || (svc.heroSection?.title || 'service').toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')}`}
                        className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition duration-150 group"
                      >
                        <div className="w-8 h-8 flex items-center justify-center text-xl text-green-600 border border-gray-300 rounded-full flex-shrink-0 mt-1">
                          📌
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                            {svc.heroSection?.title || 'Untitled'}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-2">{svc.heroSection?.description || '—'}</p>
                        </div>
                      </Link>
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
