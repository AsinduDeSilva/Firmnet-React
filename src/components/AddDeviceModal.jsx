import React, { useState } from "react";
import { backendAddress } from "../constants/BackendInfo";

const AddDeviceModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const[deviceId, setDeviceId] = useState("");
  const[deviceName, setDeviceName] = useState("");
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");
  const[ipAddress, setIpAddress] = useState("");
  const[firmwareUpdateUrl, setFirmwareUpdateUrl] = useState("");

  const btnAddDeviceOnClick = () => {
    
    fetch(`${backendAddress}/api/v1/device`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            name: deviceName,
            username: username,
            password: password,
            ip: ipAddress,
            firmwareUpdateURL: firmwareUpdateUrl,
        }),
    })
    .then((response) => response.json())
    .then(data => {
        if(data.success){
            alert("Device added successfully.")
        }
    });
  }


  return (
    <>
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-md flex justify-center items-center z-10">
        <div className="bg-white p-6 rounded-lg shadow-lg w-160">
            <h2 className="text-xl font-bold mb-4">ADD DEVICE</h2>

            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Device ID</label>
                    <input 
                        value={deviceId}
                        type="text" 
                        className="mt-1 p-2 w-full border rounded-md" 
                        //required 
                        onChange={(e) => setDeviceId(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Device Name</label>
                    <input 
                        value={deviceName}
                        type="text" 
                        className="mt-1 p-2 w-full border rounded-md" 
                        onChange={(e) => setDeviceName(e.target.value)}
                        required 
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Username</label>
                    <input 
                        value={username}
                        type="text" 
                        className="mt-1 p-2 w-full border rounded-md" 
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Password</label>
                    <input 
                        value={password}
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md" 
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Ip Address</label>
                    <input 
                        value={ipAddress}
                        type="text" 
                        className="mt-1 p-2 w-full border rounded-md" 
                        onChange={(e) => setIpAddress(e.target.value)}
                        required 
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Firmware Update URL</label>
                    <input 
                        value={firmwareUpdateUrl}
                        type="text" 
                        className="mt-1 p-2 w-full border rounded-md" 
                        onChange={(e) => setFirmwareUpdateUrl(e.target.value)}
                        required 
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-black text-white rounded-md" onClick={btnAddDeviceOnClick}>
                        Add Device
                    </button>
                </div>
            </form>
        </div>
        </div>
    </>
  );
};

export default AddDeviceModal;
