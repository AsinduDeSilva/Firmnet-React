import React from 'react';
import Sidebar from './components/Sidebar';
import Firmware from './components/Firmware';
import Devices from './components/Devices'
import Performance from './components/Perfomance';
import LoginForm from './components/Signin';
function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pt-10 bg-[#F0F0F0]">
        <Firmware />
      </div>
    </div>
  );
}

export default App;
