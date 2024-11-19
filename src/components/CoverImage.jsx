import React from 'react'
import EditProfileImg from './EditProfileImg'
import bg from "../assets/coding.jpg";

const CoverImage = ({ userdefaultimg, handleInputChange }) => {
  return (
    <div className="w-full rounded-sm bg-cover bg-center bg-no-repeat p-4 bg-[url(univ.jpg)]" style={{ backgroundImage: `url(${bg})` }}>
        <EditProfileImg userdefaultimg={userdefaultimg} handleInputChange={handleInputChange} />
    </div>
  )
}

export default CoverImage