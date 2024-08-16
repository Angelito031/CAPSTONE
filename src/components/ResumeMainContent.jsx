import React from 'react'
import ResumeContact from './ResumeContact'
import ResumeSkills from './ResumeSkills'
import { useAuthStore } from "../store/store"
import ResumeProjects from './ResumeProjects'

const ResumeMainContent = () => {
  const {user} = useAuthStore()
  const resume = user?.resume

  return (
    <div className="p-5">
    <div className="flex flex-col sm:flex-row sm:mt-10">
      <div className="flex flex-col sm:w-1/3">
        <ResumeContact />
        <ResumeSkills />
      </div>
      <div className="flex flex-col sm:w-1/3">
        <h2 className="text-lg font-poppins font-bold text-gray-700">About</h2>
        <div className="border-2 w-20 border-gray-700 my-3"></div>
        <p className='ml-2 my-2'>{resume?.description}</p>
        <ResumeProjects/>
      </div>
    </div>
  </div>
  )
}

export default ResumeMainContent