import React from "react";

const AddDeviceModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <>
        
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-md flex justify-center items-center z-10">
        <div className="bg-white p-6 rounded-lg shadow-lg w-160">
            <h2 className="text-xl font-bold mb-4">ADD DEVICE</h2>

            <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Device ID</label>
                <input type="text" className="mt-1 p-2 w-full border rounded-md" required />
            </div>

            <div>
                <label className="block text-gray-700">Username</label>
                <input type="email" className="mt-1 p-2 w-full border rounded-md" required />
            </div>

            <div>
                <label className="block text-gray-700">Password</label>
                <input type="email" className="mt-1 p-2 w-full border rounded-md" required />
            </div>

            <div>
                <label className="block text-gray-700">Ip Address</label>
                <input type="email" className="mt-1 p-2 w-full border rounded-md" required />
            </div>

            <div>
                <label className="block text-gray-700">Firmware Update URL</label>
                <input type="email" className="mt-1 p-2 w-full border rounded-md" required />
            </div>

            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md">
                Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-black text-white rounded-md">
                Add
                </button>
            </div>
            </form>
        </div>
        </div>
    </>
  );
};

export default AddDeviceModal;
