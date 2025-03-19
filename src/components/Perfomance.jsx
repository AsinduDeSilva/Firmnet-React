import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
import Select from "react-select";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

// Color palettes
const colors = {
  blackBrown: ["#000000", "#5C4033"],
  blackLightBrown: ["#000000", "#A67B5B"],
  blackWhite: ["#000000", "#FFFFFF"],
  brownBlack: ["#5C4033", "#000000"],
  brownWhite: ["#5C4033", "#FFFFFF"],
  lightBrown: ["#A67B5B"],
  monochrome: ["#7F7F7F", "#4D4D4D"],
  beige: ["#F5F5DC", "#D2B48C"],
  brownShades: ["#8B4513", "#A0522D", "#D2691E"],
  whiteBlack: ["#FFFFFF", "#000000"],
  whiteBrown: ["#FFFFFF", "#5C4033"],
};

// Chart data
const cpuMemoryData = {
  labels: ["00:00", "01:00", "02:00", "03:00", "04:00"],
  datasets: [
    {
      label: "CPU Usage",
      data: [30, 40, 35, 50, 45],
      borderColor: colors.blackBrown[0],
      backgroundColor: colors.blackBrown[1],
    },
    {
      label: "Memory Usage",
      data: [45, 50, 48, 55, 53],
      borderColor: colors.blackLightBrown[0],
      backgroundColor: colors.blackLightBrown[1],
    },
  ],
};



const networkData = {
  labels: ["00:00", "01:00", "02:00", "03:00", "04:00"],
  datasets: [
    {
      label: "Latency (ms)",
      data: [20, 25, 22, 30, 27],
      backgroundColor: colors.brownBlack[0],
    },
    {
      label: "Packet Loss (%)",
      data: [2, 3, 1, 4, 2],
      backgroundColor: colors.brownWhite[1],
    },
  ],
};

const firmwareData = {
  labels: ["Success", "Failure"],
  datasets: [
    {
      data: [85, 15],
      backgroundColor: colors.whiteBlack,
    },
  ],
};

const deviceUptimeData = {
  labels: ["00:00", "01:00", "02:00", "03:00", "04:00"],
  datasets: [
    {
      label: "Uptime (%)",
      data: [98, 97, 96, 95, 94],
      borderColor: colors.monochrome[0],
      backgroundColor: colors.monochrome[1],
    },
    {
      label: "Downtime (%)",
      data: [2, 3, 4, 5, 6],
      borderColor: colors.beige[0],
      backgroundColor: colors.beige[1],
    },
  ],
};

const responseTimeData = {
  labels: ["00:00", "01:00", "02:00", "03:00", "04:00"],
  datasets: [
    {
      label: "Response Time (ms)",
      data: [120, 110, 115, 130, 125],
      borderColor: colors.brownShades[0],
      backgroundColor: colors.brownShades[1],
    },
  ],
};

const securityStatusData = {
  labels: ["Secure Devices", "Vulnerable Devices"],
  datasets: [
    {
      data: [70, 30],
      backgroundColor: colors.whiteBrown,
    },
  ],
};

const Performance = () => {

  const deviceOptions = [
    { label: "Device 1", value: "Device 1", ip: "192.168.1.10" },
    { label: "Device 2", value: "Device 2", ip: "192.168.1.20" },
    { label: "Device 3", value: "Device 3", ip: "192.168.1.30" },
    { label: "Device 4", value: "Device 4", ip: "192.168.1.30" },
    { label: "Device 45", value: "Device 45", ip: "192.168.1.30"},];
  
  const handleDeviceChange = (selectedOption) => {
    setDevice(selectedOption.value);
  
    
    const deviceInfo = deviceOptions.find((dev) => dev.value === selectedOption.value);
    setDeviceDetails(deviceInfo || {});
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
  const [device, setDevice] = useState("");
  const [deviceDetails, setDeviceDetails] = useState({});
  
  return (
    <>
      <h1 className="text-4xl font-bold pl-5">Performances</h1>
      <br />
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
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* CPU & Memory Usage */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">CPU & Memory Usage</h2>
          <div style={{ width: "100%", height: "200px" }}>
            <Line data={cpuMemoryData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Network Latency & Packet Loss */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">Network Latency & Packet Loss</h2>
          <div style={{ width: "100%", height: "200px" }}>
            <Bar data={networkData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Firmware Update Success/Failure */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">Firmware Success/Failure Rate</h2>
          <div style={{ width: "100%", height: "200px" }}>
            <Pie data={firmwareData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Device Uptime/Downtime */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">Device Uptime/Downtime</h2>
          <div style={{ width: "100%", height: "200px" }}>
            <Line data={deviceUptimeData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Response Time */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">Response Time</h2>
          <div style={{ width: "100%", height: "200px" }}>
            <Line data={responseTimeData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Security Status */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">Security Status</h2>
          <div style={{ width: "100%", height: "200px" }}>
            <Pie data={securityStatusData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Performance;