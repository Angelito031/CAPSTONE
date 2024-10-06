import { useAuthStore, useUserStore } from "../store/store";
import React, { useEffect, useState } from "react";
import { lineSpinner } from "ldrs";
import CreateInputField from "./CreateInputField";
import { useLocation } from 'react-router-dom';
import FormGroup from './FormGroup';
import { FaArrowLeft } from 'react-icons/fa';

const Table = ({ data }) => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const { removeAccount, fetchUsers,  message, setMessage, success, setSuccess, adminUpdateUser } = useUserStore()
    const { user } = useAuthStore()
    const { uid, role } = user
    const [showModal, setShowModal] = useState(false); 
    const [showEditModal, setShowEditModal] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [userToEdit, setUserToEdit] = useState(null);
    const [formData, setFormData] = useState({
      firstname: "",
      lastname: "",
      companyname: "",
      contactno: "",
      location: "",
      email: "",
      role: "",
  });
    lineSpinner.register()

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevData => ({
          ...prevData,
          [name]: value
      }));
  };
    const handleDelete = async () => {
      setIsLoading(true);
      await removeAccount(userToDelete, role)
      await fetchUsers();
      setIsLoading(false);
  };  
  const handleSubmit = async (e)=>{
    e.preventDefault()
    setIsLoading(true)
    await adminUpdateUser(userToEdit, formData, role, uid)
    await fetchUsers()
    
    setTimeout(() => {
      setSuccess(false)
      setMessage(null)
      setShowEditModal(false)
      setIsLoading(false)
    }, 2000)
  
    setFormData({
      firstname: "",
      lastname: "",
      companyname: "",
      contactno: "",
      location: "",
      email: "",
      role: "",
    })
  }
  const handleEditModal = (uid)=>{
    setShowEditModal(true)
    setUserToEdit(uid)
    const userData = data.find((user) => user.uid === uid);

    setFormData({
      ...(lastSegment === 'users' && { firstname: userData.firstname }),
      ...(lastSegment === 'users' && { lastname: userData.lastname }),
      ...(lastSegment === 'companies' && { companyname: userData.companyname }), // Conditionally add companyname
      contactno: userData.contactno,
      location: userData.location? userData.location : "N/A",
      email: userData.email,
      role: userData.role,
    })    
  }
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
                    <button onClick={()=> handleEditModal(user.uid)} className="px-3 py-1 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
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
        {
        showEditModal && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
            <div className="relative p-4 w-1/2 mx-auto flex flex-col justify-center rounded-lg bg-white items-center z-40">
            <button onClick={()=> setShowEditModal(false)} className="text-white h-5 lg:h-fit p-2 rounded-md bg-gray-500 hover:bg-gray-600 shadow hover:shadow-lg font-extralight lg:font-medium transition transform hover:-translate-y-0.5 self-start"><FaArrowLeft /></button>
              <form className={`${success ? "hidden" : ""}flex flex-col bg-white shadow-gray-100 z-50`} method='POST' onSubmit={handleSubmit}>
                  {lastSegment === "users" ? (
                      <FormGroup>
                          <CreateInputField
                              type="text"
                              name="firstname"
                              id="floating_first_name"
                              label="First name"
                              value={formData.firstname}
                              onChange={handleChange}
                          />
                          <CreateInputField
                              type="text"
                              name="lastname"
                              id="floating_last_name"
                              label="Last name"
                              value={formData.lastname}
                              onChange={handleChange}
                          />
                      </FormGroup>
                  ) : (
                      <CreateInputField
                          type="text"
                          name="companyname"
                          id="floating_companyname"
                          label="Company Name"
                          value={formData.companyname}
                          onChange={handleChange}
                      />
                  )}
                  <FormGroup>
                    <CreateInputField
                        type="text"
                        name="location"
                        id="floating_location"
                        label="Location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                    <CreateInputField
                        type="number"
                        name="contactno"
                        id="floating_number"
                        label="Number"
                        value={formData.contactno}
                        onChange={handleChange}
                    />
                  </FormGroup>
                    <CreateInputField
                        type="email"
                        name="email"
                        id="floating_email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <FormGroup>
                    <CreateInputField
                        type="password"
                        name="password"
                        id="floating_password"
                        label="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <CreateInputField
                        type="text"
                        name="role"
                        id="floating_role"
                        label="Role"
                        value={formData.role}
                        onChange={handleChange}
                    />
                    </FormGroup>
                    
                  <button
                      type="submit"
                      disabled={isLoading}
                      className={`text-white bg-blue-700 ${isLoading ? "" : "hover:bg-blue-800"} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm min-w-full sm:w-auto px-5 py-2.5 text-center`}
                  >
                      {isLoading ? <l-line-spinner color="white" size="15" speed="1" /> : "Submit"}
                  </button>
                  {success && <p className="text-gray-50 bg-green-700 text-center rounded-sm w-full p-1 my-1">{message}</p>}
              </form>
          </div>
          </>
          
        )
        //DELETE MODAL
        }   
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
  