import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Devices from './components/Devices'
import Signin from './components/Signin'
import Firmware from './components/Firmware'
import Performance from './components/Perfomance';
import Cookies from "js-cookie";
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

function ProtectedRoute({ children }) {
  const isAuthenticated = true; //Cookies.get('auth') === "true";
  return isAuthenticated ? children : <Navigate to="/signin" />;
}

function App() {

  return (
      <Routes>
        <Route path="/signin" element={<Signin />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex">
                <Sidebar />
                <div className="flex-1 bg-[#15151f]">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/devices" element={<Devices />} />
                    <Route path="/firmware" element={<Firmware />} />
                    <Route path="/performance" element={<Performance />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
  );
}

export default App;