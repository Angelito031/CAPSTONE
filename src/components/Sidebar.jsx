import { FaDatabase, FaSignOutAlt, FaUserAlt, FaBuilding, FaUserPlus } from 'react-icons/fa';
import { MdOutlineDashboard, MdOutlineWork } from 'react-icons/md';
import { BsBuildingFillAdd } from 'react-icons/bs';
import { useAuthStore } from "../store/store";
import SidebarItem from './SidebarItem'; 
import React, { useState } from 'react';
import axios from 'axios';

const Sidebar = () => {
  const { logout } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    setIsLoading(true);
    await axios.delete('http://127.0.0.1:9000/api/resetDatabase');
    setShowModal(false);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col antialiased bg-gray-800 text-gray-800">
      <div className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
        <div className="flex items-center justify-center h-14 border-b">
          <div>UDM | On-The-Job Training</div>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-2 space-y-1">
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
              </div>
            </li>
            <SidebarItem
              label="Dashboard"
              icon={MdOutlineDashboard}
              to="/admin/dashboard"  
            />
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">Create</div>
              </div>
            </li>
            <SidebarItem
              label="User"
              icon={FaUserPlus}
              to="/admin/create/user"  
            />
            <SidebarItem
              label="Company"
              icon={BsBuildingFillAdd}
              to="/admin/create/company"  
            />
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">Tables</div>
              </div>
            </li>
            <SidebarItem
              label="Users"
              icon={FaUserAlt}
              to="/admin/table/users"  
            />
            <SidebarItem
              label="Companies"
              icon={FaBuilding}
              to="/admin/table/companies"  
            />
            <SidebarItem
              label="Jobs"
              icon={MdOutlineWork}
              to="/admin/table/jobs"  
            />
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">Settings</div>
              </div>
            </li>
            <SidebarItem label="Reset Database" icon={FaDatabase} onClick={() => setShowModal(true)}/>
            <SidebarItem
              label="Logout"
              icon={FaSignOutAlt}
              onClick={logout}
            />
          </ul>
        </div>
      </div>
    </div>
    {showModal && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
          <div className="bg-cyan-100 h-32 w-72 absolute top-48 left-1/2 transform -translate-x-1/2 text-black font-bold rounded-md shadow-lg z-40">
            <p className="text-center mt-5 mx-2"> Are you sure to <span className='text-red-700 underline'>RESET THE DATABASE</span></p>
            <div className='flex flex-row justify-center'>
              <button
                onClick={() => setShowModal(false)}
                className="text-white h-10 lg:h-auto py-2 px-4 my-2 mx-2 uppercase rounded bg-green-700 hover:bg-green-800 shadow hover:shadow-lg font-extralight lg:font-medium transition transform hover:-translate-y-0.5"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                disabled={isLoading}
                className="text-white h-10 lg:h-auto py-2 px-4 my-2 uppercase rounded bg-red-700 hover:bg-red-800 shadow hover:shadow-lg font-extralight lg:font-medium transition transform hover:-translate-y-0.5"
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
