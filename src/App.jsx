import React from 'react';
import Sidebar from './components/Sidebar';
import Firmware from './components/Firmware';
import Devices from './components/Devices'

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <Devices />
      </div>
    </div>
  );
}

export default App;
