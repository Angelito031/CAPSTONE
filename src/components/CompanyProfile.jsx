import React from "react";
import userdefaultimg from "../assets/user-default-icon.jpg";

const CompanyProfile = ({ user }) => {
  const userimage = user?.profile || userdefaultimg;

  return (
    <div className="relative pt-8 px-4 w-full h-fit flex justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl">
        {/* Cover Image */}
        <div className="h-32 overflow-hidden rounded-t-lg">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="Cover"
          />
        </div>

        {/* Profile Image */}
        <div className="flex justify-center -mt-12">
          <img
            className="h-24 w-24 bg-white p-1 rounded-full shadow-md"
            src={userimage}
            alt="User"
          />
        </div>

        {/* Company Details */}
        <div className="text-center px-6 py-4">
          <h2 className="text-gray-800 text-xl sm:text-2xl md:text-3xl font-bold">
            {user?.companyname || "Company Name"}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">{user?.location || "Location"}</p>
          <p className="text-gray-500 text-sm sm:text-base">{user?.email || "Email Address"}</p>
          <hr className="my-4" />
          <p className="text-gray-500 text-sm sm:text-base">
            {user?.description || "Company description goes here."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
