import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for mobile menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-neutral-900 border-b border-gray-700 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-xl text-yellow-400 tracking-wider">
            <Link to="/">CLASH STATS</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/search" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Find Clan/Player</Link>
              <Link to="/login" className="bg-yellow-500 text-black hover:bg-yellow-400 px-4 py-2 rounded-md text-sm font-bold">
                Login / Signup
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-neutral-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link onClick={toggleMenu} to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link onClick={toggleMenu} to="/search" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Find Clan/Player</Link>
            <Link onClick={toggleMenu} to="/login" className="text-yellow-400 hover:text-yellow-300 block px-3 py-2 rounded-md text-base font-bold">Login / Signup</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
