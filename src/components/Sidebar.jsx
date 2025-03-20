import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Sidebar = () => {
 
  const [currentPage, setCurrentPage] = useState('home');
  const navigate = useNavigate();

  return (
    <div className="bg-white text-black w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-100 ease-in-out">
      <div className="text-black flex items-center space-x-2 px-4">
      <div className="flex justify-center items-center">
        <img src="/logo1.png" alt="Logo"className="h-40 w-60" />
      </div>
      </div>
      <nav className="space-y-8">
        <Link
          to="/"
          className={`flex justify-center items-center py-3 px-4 rounded-[35px] transition duration-100 ${
            currentPage === 'home' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
          }`}
          onClick={() => setCurrentPage('home')}
        >
          Home
        </Link>
        <Link
          to="/devices"
          className={`flex justify-center items-center py-3 px-4 rounded-[35px] transition duration-100 ${
            currentPage === 'devices' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
          }`}
          onClick={() => setCurrentPage('devices')}
        >
          Devices
        </Link>
        <Link
          to="/firmware"
          className={`flex justify-center items-center py-3 px-6 rounded-[35px] transition duration-100 ${
            currentPage === 'firmware' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
          }`}
          onClick={() => setCurrentPage('firmware')}
        >
          Firmware
        </Link>
        <Link
          to="/performance"
          className={`flex justify-center items-center py-3 px-4 rounded-[35px] transition duration-100 ${
            currentPage === 'performance' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
          }`}
          onClick={() => setCurrentPage('performance')}
        >
          Performance
        </Link>
        <a
          className={`flex justify-center items-center py-3 px-6 rounded-[35px] transition duration-100 ${
            currentPage === 'logout' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
          }`}
          onClick={() => {
            Cookies.remove("auth");
            navigate("/signin", {replace: true});
          }}
        >
          Log Out
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;