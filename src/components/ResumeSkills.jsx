import React from "react"
import { useAuthStore } from "../store/store"

const ResumeSkills = ({resume}) => {
  const { user } = useAuthStore()
  // Handle case where user or resume is undefined
  const skillsList = user?.resume ?  user.resume?.skills : resume?.skills || []

  return (
    <div className="py-3">
      <h2 className="text-lg font-poppins font-bold text-gray-700">Skills</h2>
      <div className="border-2 w-20 border-gray-700 my-3"></div>
      
      {skillsList?.length > 0 ? (
        <ul className="list-disc ml-5">
          {skillsList.map((skill, index) => (
            <li key={index} className="text-gray-700">
              {skill}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No skills listed.</p>
      )}
    </div>
  )
}

export default ResumeSkills
