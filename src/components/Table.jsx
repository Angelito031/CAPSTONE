import { useAuthStore, useUserStore } from "../store/store";
import React from "react";

const Table = ({ data }) => {
    const { removeAccount, fetchUsers } = useUserStore()
    const { user } = useAuthStore()
    const { role } = user

    const handleDelete = async (uid) => {
        await removeAccount(uid, role)
        await fetchUsers();
    }

    return (
      <div className="h-full relative p-8 ml-64 w-full">
        <table className="divide-y divide-gray-200 bg-gray-300 w-full rounded-md">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data && data.length > 0 ? (
              data.map((user, index) => (
                <tr key={index}>
                  <td className="p-3 whitespace-nowrap">{user.firstname + " " + user.lastname}</td>
                  <td className="p-3 whitespace-nowrap">{user.email}</td>
                  <td className="p-3 whitespace-nowrap">{user.contactno? user.contactno : "N/A"}</td>
                  <td className="p-3 whitespace-nowrap">{user.role}</td>
                  <td className="p-3 whitespace-nowrap">
                    <button className="px-3 py-1 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user.uid)} className="ml-2 px-3 py-1 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  NO DATA AVAILABLE
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;
  