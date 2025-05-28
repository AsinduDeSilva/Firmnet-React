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
  Alert,
  Slide,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { backendAddress } from "../constants/BackendInfo";
import UpdateDeviceModal from "./UpdateDeviceModal";
import AddDeviceModal from "./AddDeviceModal";

const columns = [
  { id: "id", label: "Device ID", minWidth: 50 },
  { id: "name", label: "Device Name", minWidth: 100 },
  { id: "ipAddress", label: "IP Address", minWidth: 100, align: "center" },
  { id: "actions", label: "Actions", minWidth: 100, align: "center" },
];

const Devices = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [isAddDdeviceModalOpen, setAddDdeviceModalOpen] = useState(false);
  const [isUpdateDdeviceModalOpen, setUpdateDdeviceModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(0);
  const [deleteSuccess, setDeleteSuccess] = useState(false); 

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (deviceId) => {
    if (!confirm("Are you sure want to delete this device?")) return;
    deleteDevice(deviceId);
  };

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = () => {
    fetch(`${backendAddress}/api/v1/device`)
      .then((response) => response.json())
      .then((data) => setRows(data));
  };

  const deleteDevice = (deviceId) => {
    fetch(`${backendAddress}/api/v1/device/${deviceId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          loadDevices();
          setDeleteSuccess(true); 
          setTimeout(() => setDeleteSuccess(false), 3000); 
        }
      });
  };

  return (
    <>
     
      {deleteSuccess && (
        <Slide direction="down" in={deleteSuccess} mountOnEnter unmountOnExit>
          <div className="absolute top-4 z-50 w-full flex justify-center">
            <Alert severity="error" className="w-1/2 text-center">
              Device deleted successfully.
            </Alert>
          </div>
        </Slide>
      )}

      <div className="flex flex-col items-center min-h-screen bg-[#15151f]">
        <h2 className="text-4xl font-bold my-10 text-[#d3d5de] w-[95%]">
          DEVICES
        </h2>
        <div className="flex w-[95%] justify-end pb-5">
          <button
            className="px-8 py-2 rounded-md bg-[#1e1e2b] border-[#4b9eda] border-2 text-[#4b9eda] hover:bg-[#252c42] hover:text-[#4b9eda] hover:cursor-pointer"
            onClick={() => setAddDdeviceModalOpen(true)}
          >
            + Add Device
          </button>
        </div>

        <Paper
          sx={{
            width: "95%",
            overflow: "hidden",
            backgroundColor: "#1e1e2b",
            borderRadius: 3,
          }}
        >
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        color: "#d3d5de",
                        backgroundColor: "#1e1e2b",
                        fontWeight: "bold",
                        fontSize: "16px",
                        borderBottom: "1px solid #8b8b97",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{
                              color: "#d3d5de",
                              backgroundColor: "#1e1e2b",
                              borderBottom: "1px solid #8b8b97",
                            }}
                          >
                            {column.id === "actions" ? (
                              <div className="flex justify-center space-x-3">
                                <CloudUploadIcon className="text-[#d3d5de] cursor-pointer" />
                                <EditIcon
                                  className="text-[#d3d5de] cursor-pointer"
                                  onClick={() => {
                                    setUpdateDdeviceModalOpen(true);
                                    setSelectedDevice(row.id);
                                  }}
                                />
                                <DeleteIcon
                                  className="text-[#d3d5de] cursor-pointer"
                                  onClick={() => handleDelete(row.id)}
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
            sx={{ color: "#d3d5de" }}
          />
        </Paper>

        <AddDeviceModal
          isOpen={isAddDdeviceModalOpen}
          onClose={() => setAddDdeviceModalOpen(false)}
        />
        <UpdateDeviceModal
          isOpen={isUpdateDdeviceModalOpen}
          onClose={() => setUpdateDdeviceModalOpen(false)}
          selectedDevice={selectedDevice}
        />
      </div>
    </>
  );
};

export default Devices;
