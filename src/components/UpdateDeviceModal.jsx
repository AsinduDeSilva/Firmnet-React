import React, { useEffect, useState } from 'react';
import { Alert, Slide } from '@mui/material';
import { backendAddress } from '../constants/BackendInfo';

const UpdateDeviceModal = ({ isOpen, onClose, selectedDevice }) => {
  if (!isOpen) return null;

  const [deviceName, setDeviceName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const btnUpdateDeviceOnClick = (e) => {
    e.preventDefault();
    if (!isValidated()) return;

    fetch(`${backendAddress}/api/v1/device/${selectedDevice}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        name: deviceName,
        username: username,
        password: password,
        ipAddress: ipAddress,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUpdateSuccess(true);
          setTimeout(() => {
            setUpdateSuccess(false);
            onClose();
          }, 3000);
        }
      });
  };

  const isValidated = () => {
    return true; 
  };

  const loadDeviceDeatils = () => {
    fetch(`${backendAddress}/api/v1/device/${selectedDevice}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setDeviceName(data.data.name);
          setUsername(data.data.username);
          setPassword(data.data.password);
          setIpAddress(data.data.ipAddress);
        }
      });
  };

  useEffect(() => {
    loadDeviceDeatils();
  }, [selectedDevice]);

  return (
    <>
      {updateSuccess && (
        <Slide direction="down" in={updateSuccess} mountOnEnter unmountOnExit>
          <div className="absolute top-4 z-50 w-full flex justify-center">
            <Alert severity="info" className="w-1/2 text-center">
              Device Updated Successfully!
            </Alert>
          </div>
        </Slide>
      )}

      <div className="fixed inset-0 bg-opacity-40 backdrop-blur-md flex justify-center items-center z-10">
        <div className="p-6 rounded-lg shadow-lg w-160 bg-[#1e1e2b]">
          <h2 className="text-xl font-bold mb-4 text-[#d3d5de]">UPDATE DEVICE</h2>

          <form onSubmit={btnUpdateDeviceOnClick} className="space-y-4">
            <div>
              <label className="block text-[#ccccd6]">Name</label>
              <input
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                type="text"
                className="mt-1 p-2 w-full border rounded-md bg-[#d3d5de]"
                required
              />
            </div>

            <div>
              <label className="block text-[#ccccd6]">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="mt-1 p-2 w-full border rounded-md bg-[#d3d5de]"
                required
              />
            </div>

            <div>
              <label className="block text-[#ccccd6]">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="mt-1 p-2 w-full border rounded-md bg-[#d3d5de]"
                required
              />
            </div>

            <div>
              <label className="block text-[#ccccd6]">IP Address</label>
              <input
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                type="text"
                className="mt-1 p-2 w-full border rounded-md bg-[#d3d5de]"
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-md bg-[#1e1e2b] border-[#4b9eda] border-2 
                  text-[#4b9eda] hover:bg-[#252c42] hover:text-[#4b9eda] hover:cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-8 py-2 rounded-md bg-[#1e1e2b] border-[#4b9eda] border-2 
                  text-[#4b9eda] hover:bg-[#252c42] hover:text-[#4b9eda] hover:cursor-pointer"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateDeviceModal;
