import { useAuthStore } from "../store/store"
import userdefaultimg from "../assets/user-default-icon.jpg";
import React from "react";

const ResumeTop = () => {
  const {user} = useAuthStore()
  const resume = user?.resume
  const resumeimage = resume?.image || userdefaultimg

  return (
    <div className="flex rounded-t-lg bg-gray-700 sm:px-2 w-full text-white">
      <div className="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3 bg-white">
        <img 
          src={resumeimage} 
          alt="Resume Image"
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="w-2/3 sm:text-center mt-10 text-start flex pl-8 items-center">
        <p className="font-poppins font-bold text-7xl sm:text-4xl">
          {resume?.firstname} {resume?.lastname}
        </p>
      </div>
    </div>
  )
}

export default ResumeTop