import { colors } from "@mui/material";
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
            backgroundColor: '#d3d5de',
            color:'black',
            border:'none',
            boxShadow: 'none',
            '&:hover': {
            border: 'none',       
            },
        }),
        placeholder: (provided) => ({
         ...provided,
            color: '#000',
        }),

         option: (provided, state) => ({
         ...provided,
            color:'black',
            backgroundColor: state.isSelected ? '#f1f1f1' : state.isFocused ? '#d1d1d1' : '#d3d5de',
        }),
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#15151f]">
            <div className="w-full max-w-3xl h-full bg-[#1e1e2b] mt-20">
                <h2 className="text-4xl font-bold mt-10 text-center text-[#d3d5de]">
                UPDATE FIRMWARE
                </h2>

                <div className="space-y-16">
                    <div className="flex items-center justify-between">
                        <Select
                        className="flex-1 mx-6 pt-10 "
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
                        <p className="text-[#d3d5de]">Device Name: {deviceDetails.label}</p>
                        <p className="text-[#d3d5de]">IP Address: {deviceDetails.ip}</p>
                    </div>
                )}
                <div className="flex items-center justify-between mt-6">
                    <label className="flex-1 border p-3 rounded-md mx-6 cursor-pointer bg-[#d3d5de]">
                        <div className="flex items-center justify-center space-x-3">
                            <FaUpload className="text-gray-700" size={20} />
                            <span className="text-black">{file ? file.name : "Choose Firmware File"}</span>
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
                        className="flex-1  bg-[#1e1e2b] border-[#4b9eda] border-2 text-[#4b9eda] mb-10 px-5 py-3 
                        rounded-md mx-6 hover:bg-[#252c42] hover:text-[#4b9eda]  hover:cursor-pointer"
                    >
                        Update Device
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}
