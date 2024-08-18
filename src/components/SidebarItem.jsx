import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, to, onClick }) => {
  return (
    <li>
      {to ? (
        <NavLink
          to={to}
          className={({ isActive }) =>
            `relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
              isActive ? "border-indigo-500" : "border-transparent"
            } pr-6`
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            <Icon className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">{label}</span>
        </NavLink>
      ) : (
        <button
          onClick={onClick}
          className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
        >
          <span className="inline-flex justify-center items-center ml-4">
            <Icon className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">{label}</span>
        </button>
      )}
    </li>
  );
};

export default SidebarItem;
