import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import Select from "react-select"; 
import { backendAddress, datapathId } from "../constants/BackendInfo";

export default function FirmwareUpdate() {

    const [deviceList, setDeviceList] = useState([]);
    const [firmware, setFirmware] = useState(null);
    const [device, setDevice] = useState(null);
    const [file, setFile] = useState(null);

    const handleDeviceChange = (selectedOption) => {
        setDevice(selectedOption);
        console.log(device)
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        console.log(file)
    };

    const loadDevices = () => {
        fetch(`${backendAddress}/api/v1/device`)
        .then((response) => response.json())
        .then((data) => {
            setDeviceList(data)
        })
    }

    const sendUpdate = async() => {
        let res = await fetch(`${backendAddress}/api/v1/flow`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                src_ip : "192.168.8.161",
                dst_ip : device.ipAddress,
                dpid : datapathId
            })
        })

        let data = await res.json()
        console.log(data)

        if(!data.success) return;


        const formData = new FormData();
        console.log(file)
        formData.append('file', file);
        const basicAuth = btoa(`${device.username}:${device.password}`);

        try{
            let res2 = await fetch(`http://${device.ipAddress}:80/update`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${basicAuth}`
                },
                body: formData
            })
            //if(!res2.ok) return;

            await res2.json()

        }catch(e){
            console.log(e)
        }

        console.log("Update response received.")
        alert("Firmware update successful!")

        setInterval(() => {
            
        }, 10000);

        let res3 = await fetch(`${backendAddress}/api/v1/flow`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                src_ip : "192.168.8.161",
                dst_ip : device.ipAddress,
                dpid : datapathId
            })
        })

        let data3 = await res3.json()
        console.log(data3)

    }

    useEffect(() => {
        loadDevices();
    }, []);

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
                            options={deviceList}
                            onChange={handleDeviceChange}
                            placeholder="Select Device"
                            getOptionLabel={(e) => `${e.id} - ${e.name}`}
                            getOptionValue={(e) => e}
                            styles={customStyles} 
                        />
                    </div>

                    {device && (
                        <div className="flex-1 mx-6">
                            <p className="text-[#d3d5de]">Device Name: {device.name}</p>
                            <p className="text-[#d3d5de]">IP Address: {device.ipAddress}</p>
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
                            onClick={sendUpdate}
                        >
                            Update Device
                        </button>
                    </div>
                    
                </div>
            </div>
            
        </div>
  );
}

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
    })
}
