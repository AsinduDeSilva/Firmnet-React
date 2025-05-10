import React from "react";

const AddDeviceModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

    return (
    <>
        
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-md flex justify-center items-center z-10">
            <div className="p-6 rounded-lg shadow-lg w-160 bg-[#1e1e2b]">
                <h2 className="text-xl font-bold mb-4 text-[#d3d5de]">ADD DEVICE</h2>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[#ccccd6]">Name</label>
                        <input type="text" className="mt-1 p-2 w-full border rounded-md bg-[#8b8b97]" required />
                    </div>

                    <div>
                        <label className="block text-[#ccccd6]">Username</label>
                        <input type="email" className="mt-1 p-2 w-full border rounded-md bg-[#8b8b97]" required />
                    </div>

                    <div>
                        <label className="block text-[#ccccd6]">Password</label>
                        <input type="password" className="mt-1 p-2 w-full border rounded-md bg-[#8b8b97]" required />
                    </div>

                    <div>
                        <label className="block text-[#ccccd6]">Ip Address</label>
                        <input type="text" className="mt-1 p-2 w-full border rounded-md bg-[#8b8b97]" required />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-md bg-[#1e1e2b] border-[#4b9eda] border-2 
                            text-[#4b9eda] hover:bg-[#252c42] hover:text-[#4b9eda]  hover:cursor-pointer">
                            Cancel
                        </button>
                
                        <button type="submit" className="px-8 py-2 rounded-md bg-[#1e1e2b] border-[#4b9eda] border-2 
                            text-[#4b9eda] hover:bg-[#252c42] hover:text-[#4b9eda]  hover:cursor-pointer">
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
