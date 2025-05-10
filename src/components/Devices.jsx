import React, { useState } from "react";
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

const columns = [
  { id: "deviceId", label: "Device ID", minWidth: 50 },
  { id: "deviceName", label: "Device Name", minWidth: 100 },
  { id: "ipAddress", label: "IP Address", minWidth: 100, align: "center" },
  { id: "actions", label: "Actions", minWidth: 100, align: "center" },
];

const initialRows = [
  { deviceId: "089", deviceName: "PC1", ipAddress: "192.168.1.1" },
  { deviceId: "090", deviceName: "PC2", ipAddress: "192.168.1.2" },
  { deviceId: "091", deviceName: "PC3", ipAddress: "192.168.1.3" },
  { deviceId: "092", deviceName: "PC4", ipAddress: "192.168.1.3" },
  { deviceId: "093", deviceName: "PC5", ipAddress: "192.168.1.3" },
  { deviceId: "094", deviceName: "PC6", ipAddress: "192.168.1.3" },
];

const Devices = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState(initialRows);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (deviceId) => {
    setRows(rows.filter((row) => row.deviceId !== deviceId));
  };

  const handleAddDevice = (newDevice) => {
    setRows([...rows, newDevice]);
    setIsModalOpen(false);
  };

  return (
    <>
        <div className="flex flex-col items-center min-h-screen bg-[#15151f]">
        <h2 className="text-4xl font-bold my-10 text-[#d3d5de] w-[95%]">
          DEVICES
        </h2>
        <div className="flex w-[95%] justify-end pb-5">
            <button
                className="px-8 py-2 rounded-md bg-[#1e1e2b] border-[#4b9eda] border-2 
                            text-[#4b9eda] hover:bg-[#252c42] hover:text-[#4b9eda]  hover:cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                + Add Device
            </button>
        </div>

        <Paper sx={{ width: "95%", overflow: "hidden", backgroundColor: "#1e1e2b" }}>
            <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                <TableHead sx={{ backgroundColor: "#1e1e2b" }}>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ color: "#d3d5de", backgroundColor: "#1e1e2b" }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: "#1e1e2b" }}>
                    {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                        <TableRow hover key={row.deviceId}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ color: "#d3d5de", backgroundColor: "#1e1e2b" }}
                            >
                                {column.id === "actions" ? (
                                <div className="flex justify-center space-x-3">
                                    <CloudUploadIcon className="text-[#d3d5de] cursor-pointer" />
                                    <EditIcon className="text-[#d3d5de] cursor-pointer" />
                                    <DeleteIcon
                                    className="text-[#d3d5de] cursor-pointer"
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
                sx={{ color: "#d3d5de", backgroundColor: "#1e1e2b" }}
            />
            </Paper>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddDevice} />
        </div>
    </>
  );
};

export default Devices;
