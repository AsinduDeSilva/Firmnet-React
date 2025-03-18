import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-white text-black w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="text-black flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">IoT-SDN-Firmware</span>
      </div>
      <nav className="space-y-3">
        <a
          href="/"
          className="block py-2.5 px-4 rounded-[35px] transition duration-200 hover:bg-black hover:text-white"
        >
          Home
        </a>
        <a
          href="#"
          className="block py-2.5 px-4 rounded-[35px] transition duration-200 hover:bg-black hover:text-white"
        >
          Devices
        </a>
        <a
          href="/performance"
          className="block py-2.5 px-4 rounded-[35px] transition duration-200 hover:bg-black hover:text-white"
        >
          Performance
        </a>
        <a
          href="#"
          className="block py-2.5 px-4 rounded-[35px] transition duration-200 hover:bg-black hover:text-white"
        >
          Firmware
        </a>
        <a
          href="#"
          className="block py-2.5 px-4 rounded-[35px] transition duration-200 hover:bg-black hover:text-white"
        >
          Log Out
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;