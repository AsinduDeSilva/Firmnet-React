import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import Select from "react-select";
import { backendAddress } from "../constants/BackendInfo";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler);

const Performance = () => {
  const [deviceList, setDeviceList] = useState([]);
  const [deviceDetails, setDeviceDetails] = useState(false);
  const [deviceMetrics, setDeviceMetrics] = useState({});

  const [chartData, setChartData] = useState({
    labels: [],
    cpuFrequency: [],
    chipTemperature: [],
    wifiStrength: [],
  });
  
  const handleDeviceChange = (selectedDevice) => {
    setDeviceDetails(selectedDevice || {});
    setDeviceMetrics({});
    setChartData({
      labels: [],
      cpuFrequency: [],
      chipTemperature: [],
      wifiStrength: [],
    });
  };

  const memoryUsageChart = {
    labels: ["Used", "Free"],
    datasets: [
      {
        data: [deviceMetrics.heapUsagePercent, 100 - deviceMetrics.heapUsagePercent],
        backgroundColor: [colors.accentBlue, colors.chartBackground],
      },
    ],
  };

  const cpuFrequencyChart = {
    labels: chartData.labels,
    datasets: [
      {
        label: "CPU Frequency (MHz)",
        data: chartData.cpuFrequency,
        borderColor: colors.success,
        backgroundColor: colors.success + "40",
        fill: true,
        tension: 0.2,
      }
    ],
  };

  const chipTemperatureChart = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Chip Temperature (\u00B0C)",
        data: chartData.chipTemperature,
        borderColor: colors.accentOrange,
        backgroundColor: colors.accentOrange + "40",
        fill: true,
        tension: 0.2,
      }
    ],
  };

  const wifiStrengthChart = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Wifi Strength (dBm)",
        data: chartData.wifiStrength,
        borderColor: colors.danger,
        backgroundColor: colors.danger + "40",
        fill: true,
        tension: 0.2,
      }
    ],
  };

  const loadDevices = () => {
    fetch(`${backendAddress}/api/v1/device`)
    .then((response) => response.json())
    .then((data) => {
      setDeviceList(data)
    })
  }

  const loadMetrics = (deviceId) => {
    fetch(`${backendAddress}/api/v1/device/${deviceId}/metrics`)
    .then((response) => response.json())
    .then((data) => {
      if(data.success){
        setDeviceMetrics(data.data)

        let date = new Date();

        setChartData(prev => ({
          labels: [...prev.labels.slice(-5), `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`],
          cpuFrequency: [...prev.cpuFrequency.slice(-5), data.data.cpuFreqMHz],
          chipTemperature: [...prev.chipTemperature.slice(-5), data.data.chipTemperatureCelcius],
          wifiStrength: [...prev.wifiStrength.slice(-5), data.data.rssi],
        }));
      }
    })
  }

  useEffect(() => {
    //loadDevices();
  }, []);

  useEffect(() => {
    let intervalId;
    if (deviceDetails.id) {
      // loadMetrics(deviceDetails.id);
      intervalId = setInterval(() => {
        loadMetrics(deviceDetails.id);
      }, 2000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [deviceDetails]);

  

  return (
    <>
      <h1 className="text-4xl font-bold ml-5 mb-10 mt-10 text-[#d3d5de]">PERFORMANCE</h1>
      <div className="flex items-center justify-between">
        <Select
          className="flex-1 mx-6"
          options={deviceList}
          onChange={handleDeviceChange}
          placeholder="Select Device"
          getOptionLabel={(e) => `${e.id} - ${e.name}`}
          getOptionValue={(e) => e}
          styles={customStyles}
        />
      </div>

      {true && (
        <>
        <div><br /></div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-[#1e1e2b] shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-bold mb-2 text-[#d3d5de]">Memory Usage</h2>
              <div style={{ width: "100%", height: "200px" }}>
                <Pie data={memoryUsageChart} options={pieChartOptions} />
              </div>
            </div>

            <div className="bg-[#1e1e2b] shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-bold mb-2 text-[#d3d5de]">CPU Frequency</h2>
              <div style={{ width: "100%", height: "200px" }}>
                <Line data={cpuFrequencyChart} options={{ maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-[#1e1e2b] shadow-lg rounded-lg p-4 text-center">
              <h2 className="text-lg font-semibold text-[#d3d5de]">Name of the Device</h2>
              <p className="text-sm text-[#8b8b97]">Humidity Sensor</p>
              </div>

              <div className="bg-[#1e1e2b] shadow-lg rounded-lg p-4 text-center">
              <h2 className="text-lg font-semibold text-[#d3d5de]">IP Address</h2>
              <p className="text-sm text-[#8b8b97]">192.168.214.170</p>
              </div>

               <div className="bg-[#1e1e2b] shadow-lg rounded-lg p-4 text-center">
              <h2 className="text-lg font-semibold text-[#d3d5de]">SDK Version</h2>
              <p className="text-sm text-[#8b8b97]">v5.4.1-1-g2f7dcd862a-dirty</p>
              </div>

            </div>

            <div className="bg-[#1e1e2b] shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-bold mb-2 text-[#d3d5de]">Chip Temperature</h2>
              <div style={{ width: "100%", height: "200px" }}>
                <Line data={chipTemperatureChart} options={{ maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="bg-[#1e1e2b] shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-bold mb-2 text-[#d3d5de]">Wifi Strength</h2>
              <div style={{ width: "100%", height: "200px" }}>
                <Line data={wifiStrengthChart} options={{ maintainAspectRatio: false }} />
              </div>
            </div>

             <div className="flex flex-col gap-4">
              <div className="bg-[#1e1e2b] shadow-lg rounded-lg p-4 text-center">
              <h2 className="text-lg font-semibold text-[#d3d5de]">RAM</h2>
              <p className="text-sm text-[#8b8b97]">333572 Bytes</p>
              </div>

              <div className="bg-[#1e1e2b] shadow-lg rounded-lg p-4 text-center">
              <h2 className="text-lg font-semibold text-[#d3d5de]">Uptime</h2>
              <p className="text-sm text-[#8b8b97]">2000 s</p>
              </div>
                            
            </div>

          </div>
        </>
      )}
    </>
  );
};

export default Performance;

const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    },
    tooltip: {
      callbacks: {
        label: (context) =>`${context.label}: ${context.raw}%`
      }
    }
  }
}

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
}
  
