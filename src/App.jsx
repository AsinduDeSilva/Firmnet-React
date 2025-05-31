import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Devices from './components/Devices'
import Signin from './components/Signin'
import Firmware from './components/Firmware'
import Performance from './components/Perfomance';
import Cookies from "js-cookie";
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Settings from './components/Settings';

function ProtectedRoute({ children }) {
  const isAuthenticated = true; //Cookies.get('auth') === "true";
  return isAuthenticated ? children : <Navigate to="/signin" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(Cookies.get('auth') === "true");
  }, []);

  return (
      <Routes>
        <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex">
                <Sidebar />
                <div className="flex-1 bg-[#15151f]">
                  <Routes>
                    <Route path="/devices" element={<Devices />} />
                    <Route path="/firmware" element={<Firmware />} />
                    <Route path="/performance" element={<Performance />} />
                    <Route path="/settings" element={<Settings/>}/>
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