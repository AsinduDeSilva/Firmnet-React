import React from 'react';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
      </div>
    </div>
  );
}

export default App;