import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Navbar Title */}
        <h1 className="text-2xl font-bold">All Projects</h1>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-200 transition">
              Movie App
            </Link>
          </li>
          <li>
            <Link to="/news" className="hover:text-gray-200 transition">
              News App
            </Link>
          </li>
          {/* <li>
            <Link to="/book" className="hover:text-gray-200 transition">
            Book App
            </Link>
          </li> */}
          <li>
            <Link to="/weather" className="hover:text-gray-200 transition">
            Weather App
            </Link>
          </li>
          <li>
            <Link to="/onlinegame" className="hover:text-gray-200 transition">
              Online game
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
