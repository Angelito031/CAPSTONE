import React, { useState } from 'react';
import CreateInputField from './CreateInputField'; 
import { useUserStore } from '../store/store'; 
import { bouncy } from 'ldrs';
import EditTextArea from './EditTextArea';

const CompanyEditProfile = () => {
  const { updateCompanyProfile, message, success, setMessage, setSuccess } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isMatch, setIsMatch] = useState();
  const [formData, setFormData] = useState({
    floating_company_name: '',
    floating_email: '',
    floating_location: ''
  });

  bouncy.register();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await updateCompanyProfile(formData);

    setTimeout(() => {
      setMessage(null);
      setSuccess(null);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className='h-full pt-8 px-4 relative ml-64 w-full'>
      <form className="w-1/2 mx-auto flex flex-col shadow-md p-3 shadow-gray-400" method='POST' onSubmit={handleSubmit}>
        <CreateInputField
          type="text"
          name="floating_company_name"
          id="floating_company_name"
          label="Company Name"
          value={formData.floating_company_name}
          onChange={handleChange}
        />
        <CreateInputField
          type="email"
          name="floating_email"
          id="floating_email"
          label="Email Address"
          value={formData.floating_email}
          onChange={handleChange}
        />
        <CreateInputField
          type="text"
          name="floating_location"
          id="floating_location"
          label="Location"
          value={formData.floating_location}
          onChange={handleChange}
        />
        <h5 className="mt-1">Job Description</h5>
        <EditTextArea
          name="floating_job_description"
          placeholder="Job Description"
          value={formData.floating_job_description}
          handleInputChange={handleChange}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`text-white bg-blue-700 ${isLoading ? "" : "hover:bg-blue-800"} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
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
