import React, { useState, useEffect, useRef } from 'react'; 
import FormGroup from './FormGroup';  
import CreateInputField from './CreateInputField';
import EditInputField from './EditInputField'; 
import { useJobStore, useAuthStore } from '../store/store';
import { bouncy } from 'ldrs';
import EditTextArea from './EditTextArea'; 
import { FaTrash } from 'react-icons/fa';
import {v4 as uiidv4} from 'uuid';

const CompanyCreateJob = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    email: '',
    location: '',
    limit: '',
  });
  const [skills, setSkills] = useState([]); 
  const { createJob, message, success, setMessage, setSuccess } = useJobStore();
  const jobUid = uiidv4();
  
  // Ref for the message div
  const messageRef = useRef(null);

  bouncy.register();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSkillChange = (index, e) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = e.target.value;
    setSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, '']);
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const validateFields = () => {
    const { jobTitle, jobDescription, email, location, limit } = formData;
    const limitValue = parseInt(limit, 10);

    if (!jobTitle.trim()) {
      setMessage('Job Title is required.');
      return true;
    }
    if (!location.trim()) {
      setMessage('Location is required.');
      return true;
    }
    if (!jobDescription.trim()) {
      setMessage('Job Description is required.');
      return true;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('A valid email is required.');
      return true;
    }
    if (isNaN(limitValue) || limitValue <= 0 || limitValue > 10) {
      setMessage('Please enter a valid limit between 1 and 10.');
      return true;
    }
    if (skills.length < 1 || skills.every(skill => skill.trim() === '')) {
      setMessage('Please add at least one skill.');
      return true;
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Validate all fields
    if (validateFields()) {
      setError(true);
      setIsLoading(false);

      // Reset message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      return; // Stop the function execution if the validation fails
    }

    // Prepare the job data, ensuring skills do not have empty strings
    const filteredSkills = skills.filter(skill => skill.trim() !== '');
    const jobData = { 
      ...formData, 
      skills: filteredSkills, 
      jobUid, 
      applicants: [], 
      status: 'PENDING' 
    };

    await createJob(user.uid, jobData);

    // Reset form and success message after submission
    setTimeout(() => {
      setMessage(null);
      setSuccess(null);
      setFormData({
        jobTitle: '',
        jobDescription: '',
        email: '',
        location: '',
        limit: '',
      });
      setSkills([]);
    }, 1500);

    setIsLoading(false); 
  };

  // Scroll to message when it changes
  useEffect(() => {
    if (messageRef.current && message) {
      messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [message]);

  return (
    <div className='h-full pt-8 px-4 relative ml-64 w-full'>
      <form className="w-1/2 mx-auto flex flex-col shadow-md p-3 shadow-gray-400" method='POST' onSubmit={handleSubmit}>
        <CreateInputField
          type="text"
          name="jobTitle"
          id="jobTitle"
          label="Job Title"
          value={formData.jobTitle}
          onChange={handleChange}
        />
        <FormGroup>
          <CreateInputField
            type="text"
            name="location"
            id="location"
            label="Job Location"
            value={formData.location}
            onChange={handleChange}
          />
          <CreateInputField
            type="text"
            name="limit"
            id="limit"
            label="Applicants Limit (1 to 10)"
            value={formData.limit}
            onChange={handleChange}
          />
        </FormGroup>
        <CreateInputField
          type="email"
          name="email"
          id="companyemail"
          label="Company Email"
          value={formData.email}
          onChange={handleChange}
        />

        <h5 className="mt-2">Skills</h5>
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center mb-2">
            <EditInputField
              type="text"
              name={`skill-${index}`}
              value={skill}
              placeholder={`Skill ${index + 1} (e.g., JavaScript, React)`}
              handleInputChange={(e) => handleSkillChange(index, e)}
            />
            <button
              type="button"
              className="ml-2 mt-2 text-red-600 hover:text-red-800 bg-red-300 flex justify-center items-center p-1 rounded-md gap-1"
              onClick={() => handleRemoveSkill(index)}
            >
              DELETE <FaTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800 bg-blue-300 p-1 rounded-md"
          onClick={handleAddSkill}
        >
          Add Skill
        </button>

        <h5 className="mt-4">Job Description</h5>
        <EditTextArea
          name="jobDescription"
          placeholder="Job Description"
          value={formData.jobDescription}
          handleInputChange={handleChange}
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 text-white bg-blue-700 ${isLoading ? "" : "hover:bg-blue-800"} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
        >
          {isLoading ? <l-bouncy color="white" size="25" speed="1" /> : "Submit"}
        </button>
      </form>

      <div
        ref={messageRef} 
        className={message ? `my-3 mx-auto h-fit w-1/2 text-wrap animate-pulse rounded ${error ? "bg-red-500" : "bg-green-500"} p-1 text-center` : "hidden"}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};

export default CompanyCreateJob;
