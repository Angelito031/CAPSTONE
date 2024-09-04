import React from 'react'
import Sidebar from '../components/Sidebar'
import CreateForm from '../components/CreateForm'


function CreateAccount() {

  return (
    <div className='flex h-screen'>
        <Sidebar/>
        <CreateForm/>
    </div>
  )
}

export default CreateAccount