import { FaUserEdit } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { IoBagAddSharp } from "react-icons/io5";
import SidebarItem from "./SidebarItem";
import React, { useState } from "react";
import { dotWave } from "ldrs";

const CompanySidebar = ({ user }) => {
  dotWave.register();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-[7.7rem] left-4 z-50 bg-gray-200 text-black p-1 rounded-sm lg:hidden"
      >
        {isSidebarOpen ? "Close" : "Open"} Sidebar
      </button>

      {/* Sidebar */}
      <div
        className={`fixed z-40 flex flex-col bg-white border-r transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:w-64 w-64 h-screen`}
      >
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-2">
            {/* Menu Section */}
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Menu
                </div>
              </div>
            </li>
            <SidebarItem
              label="Profile"
              icon={AiFillProfile}
              to={`/profile/${user.uid}/profile`}
            />

            {/* Create Section */}
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Create
                </div>
              </div>
            </li>
            <SidebarItem
              label="Job"
              icon={IoBagAddSharp}
              to={`/profile/${user.uid}/create/job`}
            />

            {/* Tables Section */}
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Tables
                </div>
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

            {/* Settings Section */}
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Settings
                </div>
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
    </>
  );
};

export default CompanySidebar;
