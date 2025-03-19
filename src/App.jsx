import React from 'react';
import Sidebar from './components/Sidebar';
import Firmware from './components/Firmware';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <Firmware />
      </div>
    </div>
  );
}

export default App;