import React from 'react';
import userdefaultimg from "../assets/user-default-icon.jpg";
import {Link, useLocation} from "react-router-dom"

function ProfileCard({ user }) {
  const userImage = user?.profile || userdefaultimg;
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];

  return (
    <div className="max-w-52 w-full m-2 bg-white rounded-lg shadow-md p-6">
      <div className="w-full h-32 bg-gray-300 rounded-md mb-4 flex items-center justify-center overflow-hidden">
        <img src={userImage} alt="User profile" className="w-full h-full object-fill p-4 rounded-md" />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-lg font-semibold mb-1">
          {lastSegment === "companies" ? user?.companyname : user?.firstname + " " + user?.lastname }
        </h2>
        <p className="text-xs text-gray-500 mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
          {user?.location}
        </p>
        <p className="text-xs text-gray-500 mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
          {user?.email}
        </p>
        <Link
        to={`/view/${lastSegment === "companies" ? "company" : "student"}/${user.uid}`} // Assumes the profile page is accessible at /profile/:id
        className="text-blue-500 text-sm font-semibold hover:text-blue-600"
        >
        View Profile
        </Link>
      </div>
    </div>
  );
}

export default ProfileCard;