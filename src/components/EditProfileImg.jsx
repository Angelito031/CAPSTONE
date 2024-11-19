import { FaCamera } from 'react-icons/fa';
import defaulticon from "../assets/user-default-icon.jpg";
import React, { useState } from 'react';

const EditProfileImg = ({ userdefaultimg, handleInputChange }) => {
  const [previewImage, setPreviewImage] = useState(userdefaultimg || defaulticon); // State to manage preview image

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewImage(reader.result); // Set preview image to the selected file
      };

      reader.readAsDataURL(file);
    }

    // Trigger the parent handler if necessary
    if (handleInputChange) {
      handleInputChange(event);
    }
  };

  return (
    <div
      className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${previewImage})` }}
    >
      <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
        <input
          type="file"
          name="profile"
          id="upload_profile"
          onChange={handleImageChange}
          hidden
        />
        <label htmlFor="upload_profile">
          <FaCamera className="w-6 h-5 text-blue-700" />
        </label>
      </div>
    </div>
  );
};

export default EditProfileImg;
