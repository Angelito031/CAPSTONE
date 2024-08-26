import { FaCamera } from 'react-icons/fa';
import defaulticon from "../assets/user-default-icon.jpg";
import React from 'react';

const EditProfileImg = ({ userdefaultimg, handleInputChange }) => {
  return (
    <div className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${userdefaultimg? userdefaultimg : defaulticon})` }}>
      <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
        <input type="file" name="profile" id="upload_profile" onChange={handleInputChange} hidden  />
        <label htmlFor="upload_profile">
          <FaCamera className="w-6 h-5 text-blue-700" />
        </label>
      </div>
    </div>
  );
};

export default EditProfileImg;
