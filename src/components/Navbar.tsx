import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Install with: npm install lucide-react

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl bg-white/80 backdrop-blur-md rounded-2xl shadow-lg z-50">
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/images/2.png" alt="Logo" className="rounded-full w-14 h-14" />
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 items-center text-gray-800 text-lg edu-sa-hand-medium500">
          <li className="hover:text-indigo-600 transition">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-indigo-600 transition">
            <Link to="/tapping">Tap</Link>
          </li>
          <li className="hover:text-indigo-600 transition">
            <Link to="/tapping">Logout</Link>
          </li>
          <li></li>
        </ul>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="space-y-4 text-gray-800 text-base edu-sa-hand-medium500">
            <li className="hover:text-indigo-600 transition">
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li className="hover:text-indigo-600 transition">
              <Link to="/tap" onClick={() => setIsOpen(false)}>Tapping</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
