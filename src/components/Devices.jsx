import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "./AddDeviceModal"; 
import { backendAddress } from "../constants/BackendInfo";

const columns = [
  { id: "id", label: "Device ID", minWidth: 50 },
  { id: "name", label: "Device Name", minWidth: 100 },
  { id: "ip", label: "IP Address", minWidth: 100, align: "center" },
  { id: "actions", label: "Actions", minWidth: 100, align: "center" },
];
/*
const initialRows = [
  { deviceId: "089", deviceName: "PC1", ipAddress: "192.168.1.1" },
  { deviceId: "090", deviceName: "PC2", ipAddress: "192.168.1.2" },
  { deviceId: "091", deviceName: "PC3", ipAddress: "192.168.1.3" },
  { deviceId: "092", deviceName: "PC4", ipAddress: "192.168.1.3" },
  { deviceId: "093", deviceName: "PC5", ipAddress: "192.168.1.3" },
  { deviceId: "094", deviceName: "PC6", ipAddress: "192.168.1.3" },
];*/

const Devices = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (deviceId) => {
    if(!confirm("Are you sure want to delete this device?")){
      return;
    }
    deleteDevice(deviceId);
    loadDevices();
  };

  const handleAddDevice = (newDevice) => {
    setRows([...rows, newDevice]);
    setIsModalOpen(false);
  };

  useEffect(()=> {
    loadDevices();
  },[])

  const loadDevices = () => {
    fetch(`${backendAddress}/api/v1/device`)
    .then((response) => response.json())
    .then((data) => {
      setRows(data)
    })
  }

  const deleteDevice = (deviceId) => {
    fetch(`${backendAddress}/api/v1/device/${deviceId}`,{
      method: "DELETE"
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
  }



  return (
    <>
        <div className="flex flex-col items-center min-h-screen bg-[#15151f]">
        <h2 className="text-4xl font-bold my-10 text-[#d3d5de] w-[80%]">
          DEVICES
        </h2>
        <div className="flex w-[80%]  pb-5">
            <Button
                variant="contained"
                onClick={() => setIsModalOpen(true)}
                style={{ marginBottom: "20px", backgroundColor:"black"}}
            >
                + Add Device
            </Button>
        </div>

        <Paper sx={{ width: "80%", overflow: "hidden", backgroundColor: "#1e1e2b" }}>
            <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
                <TableHead>
                <TableRow>
                    {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                        {column.label}
                    </TableCell>
                    ))}
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow hover key={row.deviceId}>
                    {columns.map((column) => {
                        const value = row[column.id];
                        return (
                        <TableCell key={column.id} align={column.align}>
                            {column.id === "actions" ? (
                            <div className="flex justify-center space-x-3">
                                <CloudUploadIcon className="text-black cursor-pointer" />
                                <EditIcon className="text-black cursor-pointer" />
                                <DeleteIcon
                                className="text-black cursor-pointer"
                                onClick={() => handleDelete(row.deviceId)}
                                />
                            </div>
                            ) : (
                            value
                            )}
                        </TableCell>
                        );
                    })}
                    </TableRow>
                ))}
                </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddDevice} />
        </div>
    </>
  );
};

export default Devices;
