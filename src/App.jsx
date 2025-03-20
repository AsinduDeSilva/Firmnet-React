import React from 'react';
import Sidebar from './components/Sidebar';
import Devices from './components/Devices'
import Signin from './components/Signin'
import Firmware from './components/Firmware'
import Performance from './components/Perfomance';
import { Route, Router, Routes } from 'react-router-dom';

function App() {
  return (

    <div className="flex">
      <Sidebar />
      <div className="flex-1 pt-10">
        <Routes>
          <Route path="/devices" element={<Devices />} />
          <Route path="/firmware" element={<Firmware />} />
          <Route path="/performance" element={<Performance />} />
        </Routes>  
      </div>
    </div> 
  );
}

export default App;
