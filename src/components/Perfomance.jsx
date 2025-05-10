import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import Select from "react-select";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

// Updated Color Palette for #1e1e2b Background
const colors = {
  background: "#1e1e2b",
  text: "#E0E0E0",
  primary: "#D4AF37",
  accentOrange: "#FF8C42",
  accentBlue: "#3DDAD7",
  slateGrey: "#708090",
  success: "#81C784",
  danger: "#E57373",
  grey: "#9E9E9E",
  chartBackground: "#2A2A3B",
};

// Chart data using updated palette
const cpuMemoryData = {
  labels: ["00:00", "01:00", "02:00", "03:00", "04:00"],
  datasets: [
    {
      label: "CPU Usage",
      data: [30, 40, 35, 50, 45],
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    {
      label: "Memory Usage",
      data: [45, 50, 48, 55, 53],
      borderColor: colors.accentOrange,
      backgroundColor: colors.accentOrange,
    },
  ],
};

const networkData = {
  labels: ["00:00", "01:00", "02:00", "03:00", "04:00"],
  datasets: [
    {
      label: "Latency (ms)",
      data: [20, 25, 22, 30, 27],
      backgroundColor: colors.accentBlue,
    },
    {
      label: "Packet Loss (%)",
      data: [2, 3, 1, 4, 2],
      backgroundColor: colors.slateGrey,
    },
  ],
};

const firmwareData = {
  labels: ["Success", "Failure"],
  datasets: [
    {
      data: [85, 15],
      backgroundColor: [colors.success, colors.danger],
    },
  ],
};

const deviceUptimeData = {
  labels: ["00:00", "01:00", "02:00", "03:00", "04:00"],
  datasets: [
    {
      label: "Uptime (%)",
      data: [98, 97, 96, 95, 94],
      borderColor: colors.success,
      backgroundColor: colors.success,
    },
    {
      label: "Downtime (%)",
      data: [2, 3, 4, 5, 6],
      borderColor: colors.danger,
      backgroundColor: colors.danger,
    },
  ],
};

const responseTimeData = {
  labels: ["00:00", "01:00", "02:00", "03:00", "04:00"],
  datasets: [
    {
      label: "Response Time (ms)",
      data: [120, 110, 115, 130, 125],
      borderColor: colors.accentBlue,
      backgroundColor: colors.accentBlue,
    },
  ],
};

const securityStatusData = {
  labels: ["Secure Devices", "Vulnerable Devices"],
  datasets: [
    {
      data: [70, 30],
      backgroundColor: [colors.success, colors.danger],
    },
  ],
};

const Performance = () => {
  const [device, setDevice] = useState("");
  const [deviceDetails, setDeviceDetails] = useState({});

  const deviceOptions = [
    { label: "Device 1", value: "Device 1", ip: "192.168.1.10" },
    { label: "Device 2", value: "Device 2", ip: "192.168.1.20" },
    { label: "Device 3", value: "Device 3", ip: "192.168.1.30" },
    { label: "Device 4", value: "Device 4", ip: "192.168.1.40" },
    { label: "Device 45", value: "Device 45", ip: "192.168.1.45" },
  ];

  const handleDeviceChange = (selectedOption) => {
    setDevice(selectedOption.value);
    const deviceInfo = deviceOptions.find((dev) => dev.value === selectedOption.value);
    setDeviceDetails(deviceInfo || {});
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
    <>
      <h1 className="text-4xl font-bold ml-5 mb-10 mt-10 text-[#d3d5de]">PERFORMANCE</h1>
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
        <div className="flex-1 mx-6 mt-4 text-white">
          <p>Device Name: {deviceDetails.label}</p>
          <p>IP Address: {deviceDetails.ip}</p>
        </div>
      )}

      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* CPU & Memory Usage */}
        <div className="bg-[#1e1e2b] shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2 text-[#d3d5de]">CPU & Memory Usage</h2>
          <div style={{ width: "100%", height: "200px" }}>
            <Line data={cpuMemoryData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Network Latency & Packet Loss */}
        <div className="bg-[#1e1e2b] shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2 text-[#d3d5de]">Network Latency & Packet Loss</h2>
          <div style={{ width: "100%", height: "200px" }}>
            <Bar data={networkData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Firmware Update Success/Failure */}
        <div className="bg-[#1e1e2b] shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2 text-[#d3d5de]">Firmware Success/Failure Rate</h2>
          <div style={{ width: "100%", height: "200px" }}>
            <Pie data={firmwareData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Device Uptime/Downtime */}
        <div className="bg-[#1e1e2b] shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2 text-[#d3d5de]">Device Uptime/Downtime</h2>
          <div style={{ width: "100%", height: "200px" }}>
            <Line data={deviceUptimeData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Response Time */}
        <div className="bg-[#1e1e2b] shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2 text-[#d3d5de]">Response Time</h2>
          <div style={{ width: "100%", height: "200px" }}>
            <Line data={responseTimeData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Security Status */}
        <div className="bg-[#1e1e2b] shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2 text-[#d3d5de]">Security Status</h2>
          <div style={{ width: "100%", height: "200px" }}>
            <Pie data={securityStatusData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Performance;
