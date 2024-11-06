import { FaUserEdit } from 'react-icons/fa';
import {  MdOutlineWork } from 'react-icons/md';
import { AiFillProfile } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { IoBagAddSharp } from "react-icons/io5";
import SidebarItem from './SidebarItem'; 
import React from 'react';
import { dotWave } from "ldrs";

const CompanySidebar = ({ user }) => {
  dotWave.register();

  return (
    <>
      <div className=" flex flex-col antialiased bg-gray-800 text-gray-800">
      <div className="fixed flex flex-col left-0 w-64 bg-white h-fit border-r">
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-2">
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
              </div>
            </li>
            <SidebarItem
              label="Profile"
              icon={AiFillProfile}
              to={`/profile/${user.uid}/profile`}  
            />
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">Create</div>
              </div>
            </li>
            <SidebarItem
              label="Job"
              icon={IoBagAddSharp}
              to={`/profile/${user.uid}/create/job`}    
            />
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">Tables</div>
              </div>
            </li>
            <SidebarItem
              label="Jobs"
              icon={MdOutlineWork}
              to={`/profile/${user.uid}/table/jobs`}
            />
            <SidebarItem
              label="Applicants"
              icon={FaUsers}
              to={`/profile/${user.uid}/table/applicants`}
            />
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">Settings</div>
              </div>
            </li>
            <SidebarItem
              label="Edit Profile"
              icon={FaUserEdit}
              to={`/profile/${user.uid}/edit`}
            />
          </ul>
        </div>
      </div>
    </div>

    </>
  );
};

export default CompanySidebar;
