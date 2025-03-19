import React, { useState } from 'react';

const Sidebar = () => {
 
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="bg-white text-black w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-100 ease-in-out">
      <div className="text-black flex items-center space-x-2 px-4">
        <span className="flex justify-center items-center py-3 px-6 text-2xl font-extrabold">IoT-SDN-Firmware</span>
      </div>
      <nav className="space-y-8">
        <a
          href="#"
          className={`flex justify-center items-center py-3 px-4 rounded-[35px] transition duration-100 ${
            currentPage === 'home' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
          }`}
          onClick={() => setCurrentPage('home')}
        >
          Home
        </a>
        <a
          href="#"
          className={`flex justify-center items-center py-3 px-4 rounded-[35px] transition duration-100 ${
            currentPage === 'devices' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
          }`}
          onClick={() => setCurrentPage('devices')}
        >
          Devices
        </a>
        <a
          href="#"
          className={`flex justify-center items-center py-3 px-4 rounded-[35px] transition duration-100 ${
            currentPage === 'performance' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
          }`}
          onClick={() => setCurrentPage('performance')}
        >
          Performance
        </a>
        <a
          href="#"
          className={`flex justify-center items-center py-3 px-6 rounded-[35px] transition duration-100 ${
            currentPage === 'firmware' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
          }`}
          onClick={() => setCurrentPage('firmware')}
        >
          Firmware
        </a>
        <a
          href="#"
          className={`flex justify-center items-center py-3 px-6 rounded-[35px] transition duration-100 ${
            currentPage === 'logout' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
          }`}
          onClick={() => setCurrentPage('logout')}
        >
          Log Out
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;