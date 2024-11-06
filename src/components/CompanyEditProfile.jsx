import React, { useState } from 'react';
import CreateInputField from './CreateInputField'; 
import { useUserStore } from '../store/store'; 
import { bouncy } from 'ldrs';
import EditTextArea from './EditTextArea';

const CompanyEditProfile = () => {
  const { updateUser, message, success, setMessage, setSuccess } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isMatch, setIsMatch] = useState();
  const [formData, setFormData] = useState({
    companyname: '',
    email: '',
    location: '',
    description: '',
  });
  const [image, setImage] = useState(null);

  bouncy.register();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      await updateUser(formData, image); // Pass image along with formData
      setMessage("Profile updated successfully");
      setSuccess(true);
    } catch (error) {
      console.error("Failed to update user", error.message);
      setMessage("Failed to update profile");
      setSuccess(false);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setMessage(null);
        setSuccess(null);
      }, 1500);
    }
  };
  

  return (
    <div className='h-full pt-8 px-4 relative ml-64 w-full'>
      <form className="w-1/2 mx-auto flex flex-col shadow-md p-3 shadow-gray-400" method='POST' onSubmit={handleSubmit}>
        <CreateInputField
          type="text"
          name="companyname"
          id="company_name"
          label="Company Name"
          value={formData.companyname}
          onChange={handleChange}
        />
        <CreateInputField
          type="email"
          name="email"
          id="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        <CreateInputField
          type="text"
          name="location"
          id="location"
          label="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <h5 className="mt-1">Job Description</h5>
        <EditTextArea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          handleInputChange={handleChange}
        />

        {/* Image Upload Field */}
        <h5 className="mt-4">Upload Company Logo</h5>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-2"
        />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover"
          />
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`text-white bg-blue-700 ${isLoading ? "" : "hover:bg-blue-800"} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4`}
        >
          {isLoading ? <l-bouncy color="white" size="25" speed="1" /> : "Submit"}
        </button>
      </form>

      <div
        className={
          isMatch || message
            ? `my-3 h-fit w-1/2 text-wrap animate-pulse rounded ${success ? "bg-green-500" : "bg-red-500"} p-1 text-center`
            : "hidden"
        }
      >
        <p>{isMatch || message || "An error occurred"}</p>
      </div>
    </div>
  );
};

export default CompanyEditProfile;
