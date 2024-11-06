import React from 'react'
import userdefaultimg from "../assets/user-default-icon.jpg";

const CompanyProfile = ({user}) => {
    const userimage = user?.profile || userdefaultimg

  return (
    <div className=' h-full pt-8 px-4 relative ml-64 w-full'>
            <div className="h-fit lg:w-full xl:w-2/7 sm:w-full md:w-2/3 bg-white shadow-lg transform duration-200 easy-in-out">
                <div className=" h-32 overflow-hidden" >
                    <img className="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                </div>
                <div className="flex justify-center px-5  -mt-12">
                    <img className="h-32 w-32 bg-white p-2 rounded-full" src={userimage} alt="" />
                </div>
                <div className=" ">
                    <div className="text-center px-14">
                        <h2 className="text-gray-800 text-3xl font-bold">{user?.companyname}</h2>
                        <p className="text-gray-500 text-sm">{user?.location}</p>
                        <hr className="mt-6" />
                        <p className="mt-2 text-gray-500 text-sm">{user?.description}</p>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default CompanyProfile