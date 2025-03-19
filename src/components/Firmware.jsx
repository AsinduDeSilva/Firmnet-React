import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import Select from "react-select"; 

export default function FirmwareUpdate() {
  const [step, setStep] = useState(1);
  const [firmware, setFirmware] = useState("");
  const [device, setDevice] = useState("");
  const [deviceDetails, setDeviceDetails] = useState({});
  const [file, setFile] = useState(null);

  const deviceOptions = [
    { label: "Device 1", value: "Device 1", ip: "192.168.1.10" },
    { label: "Device 2", value: "Device 2", ip: "192.168.1.20" },
    { label: "Device 3", value: "Device 3", ip: "192.168.1.30" },
    { label: "Device 4", value: "Device 4", ip: "192.168.1.30" },
    { label: "Device 45", value: "Device 45", ip: "192.168.1.30" },
  ];

  const handleDeviceChange = (selectedOption) => {
    setDevice(selectedOption.value);

    
    const deviceInfo = deviceOptions.find((dev) => dev.value === selectedOption.value);
    setDeviceDetails(deviceInfo || {});
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  

  
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? 'black' : '#ccc',
      '&:hover': {
        borderColor: 'black',  
      },
      boxShadow: state.isFocused ? '0 0 0 2px rgba(0, 0, 0, 0.3)' : 'none', 
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#f1f1f1' : state.isFocused ? '#e0e0e0' : 'white',
      '&:hover': {
        backgroundColor: '#e0e0e0', 
      },
    }),
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white-100">
      <div className="w-full max-w-3xl p-10 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-10 text-center text-gray-800">
          UPDATE FIRMWARE
        </h2>

        
        <div className="space-y-16">
          
          <div className="flex items-center justify-between">
            <Select
              className="flex-1 mx-6"
              options={deviceOptions}
              onChange={handleDeviceChange}
              placeholder="Select Device"
              getOptionLabel={(e) => e.label}
              getOptionValue={(e) => e.value}
              styles={customStyles} 
            />
          </div>

          
          {device && deviceDetails.label && (
          <div className="flex-1 mx-6">
            <p className="text-gray-700">Device Name: {deviceDetails.label}</p>
            <p className="text-gray-700">IP Address: {deviceDetails.ip}</p>
          </div>
          )}

          
          <div className="flex items-center justify-between mt-6">
            <label className="flex-1 border p-3 rounded-md mx-6 cursor-pointer bg-gray-100 hover:bg-gray-200">
              <div className="flex items-center justify-center space-x-3">
                <FaUpload className="text-gray-700" size={20} />
                <span className="text-gray-700">{file ? file.name : "Choose Firmware File"}</span>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          
          <div className="flex items-center justify-between mt-6">
            <button
              className="flex-1 bg-black text-white px-5 py-3 rounded-md mx-6"
            >
              Update Device
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
