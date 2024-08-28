import React, { useState } from 'react'
import AdminDashboard from '../components/AdminDashboard'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { useAuthStore } from '../store/store';

const Admin = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    setIsLoading(true);
    await axios.delete('http://127.0.0.1:9000/api/resetDatabase');
    setShowModal(false);
  };
  return (
    <>
    <div className='flex h-screen'>
        <Sidebar setShowModal={setShowModal}/>
        <AdminDashboard/>
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
  )
}

export default Admin