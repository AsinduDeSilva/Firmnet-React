import React from 'react';
import Sidebar from './components/Sidebar';
import Devices from './components/Devices'
import Signin from './components/Signin'
import Firmware from './components/Firmware'

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pt-10">
        <Devices/>
      </div>
    </div>
  );
}

export default App;
