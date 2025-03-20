import React from 'react';
import Sidebar from './components/Sidebar';
import Devices from './components/Devices'
import Signin from './components/Signin'
import Firmware from './components/Firmware'
import Performance from './components/Perfomance';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pt-10">
        <Performance />
      </div>
    </div>
  );
}

export default App;
