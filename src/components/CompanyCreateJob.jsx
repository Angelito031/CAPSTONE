import React, { useState, useEffect, useRef } from 'react'; // Added useRef and useEffect
import CreateInputField from './CreateInputField';
import EditInputField from './EditInputField'; 
import { useJobStore } from '../store/store';
import { bouncy } from 'ldrs';
import EditTextArea from './EditTextArea'; 
import { FaTrash } from 'react-icons/fa';
import {v4 as uiidv4} from 'uuid';

const CompanyCreateJob = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check if skills array is empty or contains only empty strings
    if (skills.length < 1 || skills.every(skill => skill.trim() === '')) {
      setMessage('Please add at least one skill');
      setIsLoading(false);
  
      // Reset message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      return; // Stop the function execution if the condition is met
    }
    
    // Prepare the job data, ensuring skills do not have empty strings
    const filteredSkills = skills.filter(skill => skill.trim() !== ''); // Filter out empty strings
    const jobData = { ...formData, skills: filteredSkills,jobUid, applicants: [] }; // Prepare the job data
  
    console.log(jobData); // Log the job data to check if it is correctly formed
  
    await createJob("IPer8pdgZGVBOQAkbyVT8YiRMls2", jobData);
    // Reset form and success message after submission
    setTimeout(() => {
      setMessage(null);
      setSuccess(null);
      setFormData({
        jobTitle: '',
        jobDescription: '',
      });
      setSkills([]);
    }, 1500);
  
    setIsLoading(false); // Reset loading state
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
        className={
          message
            ? `my-3 mx-auto h-fit w-1/2 text-wrap animate-pulse rounded bg-green-500 p-1 text-center`
            : "hidden"
        }
      >
        <p>{message}</p>
      </div>
    </div>
  );
};

export default CompanyCreateJob;
