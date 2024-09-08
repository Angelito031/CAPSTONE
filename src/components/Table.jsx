import { useAuthStore, useUserStore } from "../store/store";
import React, { useState } from "react";
import { lineSpinner } from "ldrs";

const Table = ({ data }) => {
    const { removeAccount, fetchUsers,  message, setMessage, success, setSuccess  } = useUserStore()
    const { user } = useAuthStore()
    const { role } = user
    const [showModal, setShowModal] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    lineSpinner.register()

    const handleDelete = async () => {
      setIsLoading(true);
      await removeAccount(userToDelete, role)
      await fetchUsers();
      setIsLoading(false);
  };  

  const handleShowModal = (uid) => {
    setUserToDelete(uid);
    setShowModal(true);
  };
  const handleClose = () => {
    setSuccess(false);
    setMessage(null);
    setShowModal(false); 
    };

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
                  <td className="p-3 whitespace-nowrap">{user.role === "COMPANY" ? user.companyname : user.firstname + " " + user.lastname}</td>
                  <td className="p-3 whitespace-nowrap">{user.email}</td>
                  <td className="p-3 whitespace-nowrap">{user.contactno? user.contactno : "N/A"}</td>
                  <td className="p-3 whitespace-nowrap">{user.role}</td>
                  <td className="p-3 whitespace-nowrap">
                    <button className="px-3 py-1 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                      Edit
                    </button>
                    <button onClick={() => handleShowModal(user.uid)} className="ml-2 px-3 py-1 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
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
        {showModal && (
                <>
                <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
                <div className="bg-cyan-100 h-fit w-72 absolute top-48 left-1/2 transform -translate-x-1/2 text-black font-bold rounded-md shadow-lg z-40">
                    <p className="text-center mt-5">{message || "Are you sure you want to delete this user with all their data"}</p>
                    <div className="flex justify-evenly">
                      <button onClick={handleClose} className={isLoading ? "hidden" : `text-white h-10 lg:h-auto py-2 px-4 my-2 mx-5 uppercase rounded ${success ? "bg-green-700 hover:bg-green-800" : "bg-red-700 hover:bg-red-800"} shadow hover:shadow-lg font-extralight lg:font-medium transition transform hover:-translate-y-0.5 `}>{success ? "CLOSE" : "CANCEL"}</button>
                      <button
                      onClick={handleDelete}
                      disabled={isLoading}
                      className={success ? "hidden" : `text-white h-10 lg:h-auto py-2 px-4 my-2 mx-5 uppercase rounded bg-green-700 ${isLoading ? "" : "hover:bg-green-800 shadow hover:shadow-lg font-extralight lg:font-medium transition transform hover:-translate-y-0.5"}`}
                      >
                      {isLoading ? <p className="flex items-between gap-1 animate-pulse"><l-line-spinner color='white' size='20' speed="1"/>DELETING</p>  : "CONTINUE"}
                      </button>
                    </div>
                </div>
                </>
            )}
      </div>
    );
  };
  
  export default Table;
  