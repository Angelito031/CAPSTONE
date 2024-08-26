import { useAuthStore } from "../store/store"
import React from "react"

const ResumeSkills = () => {
    const {user} = useAuthStore()
    const skillsList = user?.resume.skills || []

  return (
    <div className="py-3">
      <h2 className="text-lg font-poppins font-bold text-gray-700">Skills</h2>
      <div className="border-2 w-20 border-gray-700 my-3"></div>
      <ul className="list-disc ml-5">
        {skillsList.map((skill, index) => (
          <li key={index} className="text-gray-700">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ResumeSkills