import { FaUserEdit } from 'react-icons/fa';
import { MdOutlineDashboard, MdOutlineWork } from 'react-icons/md';
import { AiFillProfile } from "react-icons/ai";
import { IoBagAddSharp } from "react-icons/io5";
import { useAuthStore } from "../store/store";
import SidebarItem from './SidebarItem'; 
import React, { useState } from 'react';
import { dotWave } from "ldrs";

const CompanySidebar = () => {
  const { logout } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  dotWave.register();


  return (
    <>
      <div className=" flex flex-col antialiased bg-gray-800 text-gray-800">
      <div className="fixed flex flex-col left-0 w-64 bg-white h-full border-r">
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-2">
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
            <SidebarItem
              label="Profile"
              icon={AiFillProfile}
              to="/admin/dashboard"  
            />
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">Create</div>
              </div>
            </li>
            <SidebarItem
              label="User"
              icon={IoBagAddSharp}
              to="/admin/create/user"  
            />
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">Tables</div>
              </div>
            </li>
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
            <SidebarItem
              label="Edit Profile"
              icon={FaUserEdit}
              to="/admin/table/jobs"  
            />
          </ul>
        </div>
      </div>
    </div>

    </>
  );
};

export default CompanySidebar;
