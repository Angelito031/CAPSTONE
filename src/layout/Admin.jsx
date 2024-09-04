import React, { useState } from 'react'
import AdminDashboard from '../components/AdminDashboard'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { useAuthStore } from '../store/store';

const Admin = () => {

  return (
    <>
    <div className='flex h-screen'>
        <Sidebar />
        <AdminDashboard/>
    </div>
    
    </>
  )
}

export default Admin