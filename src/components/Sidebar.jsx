import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { FaHome, FaMicrochip, FaDownload, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
 
  const [currentPage, setCurrentPage] = useState('home');
  const navigate = useNavigate();

  return (
    <div className="bg-[#1e1e2b] text-[#d3d5de] w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-100 ease-in-out">
      <div className="text-black flex items-center space-x-2 px-4">
      <div className="flex justify-center items-center">
        <img src="/logo1.png" alt="Logo"className="h-40 w-60" />
      </div>
      </div>
      <nav className="space-y-5">
        <Link
          to="/"
          className={`flex justify-start pl-10 items-center py-[7px] rounded-[10px] transition duration-100 ${
            currentPage === 'home' ? 'bg-[#252c42] text-[#4b9eda]' : 'hover:bg-[#252c42] hover:text-[#4b9eda]'
          }`}
          onClick={() => setCurrentPage('home')}
        >
          <FaHome className='mr-4'/>
          Home
        </Link>
        <Link
          to="/devices"
          className={`flex justify-start pl-10 items-center py-[7px] rounded-[10px] transition duration-100 ${
            currentPage === 'devices' ? 'bg-[#252c42] text-[#4b9eda]' : 'hover:bg-[#252c42] hover:text-[#4b9eda]'
          }`}
          onClick={() => setCurrentPage('devices')}
        >
          <FaMicrochip className='mr-4'/>
          Devices
        </Link>
        <Link
          to="/firmware"
          className={`flex justify-start pl-10 items-center py-[7px] rounded-[10px] transition duration-100 ${
            currentPage === 'firmware' ? 'bg-[#252c42] text-[#4b9eda]' : 'hover:bg-[#252c42] hover:text-[#4b9eda]'
          }`}
          onClick={() => setCurrentPage('firmware')}
        >
          <FaDownload className='mr-4'/>
          Firmware
        </Link>
        <Link
          to="/performance"
          className={`flex justify-start pl-10 items-center py-[7px] mb-50 rounded-[10px] transition duration-100 ${
            currentPage === 'performance' ? 'bg-[#252c42] text-[#4b9eda]' : 'hover:bg-[#252c42] hover:text-[#4b9eda]'
          }`}
          onClick={() => setCurrentPage('performance')}
        >
          <FaTachometerAlt className='mr-4'/>
          Performance
        </Link>
        <hr className="my-4 border-t border-gray-300 w-[80%] mx-auto"/>
        <a
          className={`flex justify-start pl-10 items-center py-[7px] rounded-[10px] transition duration-100 ${
            currentPage === 'logout' ? 'bg-[#252c42] text-[#4b9eda]' : 'hover:bg-[#252c42] hover:text-[#4b9eda]'
          }`}
          onClick={() => {
            Cookies.remove("auth");
            navigate("/signin", {replace: true});
          }}
        >
          <FaSignOutAlt className='mr-4' />
          Log Out
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;