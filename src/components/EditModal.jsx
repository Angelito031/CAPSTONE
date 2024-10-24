import React, { useState, useEffect } from 'react';
import FormGroup from './FormGroup';

const EditModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    email: '',
    jobDescription: '',
    limit: '',
    location: '',
    skills: ''
  });

  // Populate formData with initialData whenever the modal is opened or initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        jobTitle: initialData.jobTitle || '',
        email: initialData.email || '',
        jobDescription: initialData.jobDescription || '',
        limit: initialData.limit || '',
        location: initialData.location || '',
        skills: initialData.skills || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSave(formData); // Call the onSave function to update the job
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 m-10">
        <h2 className="text-xl font-semibold mb-4">Edit Job</h2>
        
        {/* Job Title */}
        <div className="mb-4">
          <label className="block mb-1">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Job Description */}
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Limit and Location */}
        <FormGroup>
          <div className="mb-4">
            <label className="block mb-1">Limit</label>
            <input
              type="number"
              name="limit"
              value={formData.limit}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </FormGroup>

        {/* Skills */}
        <div className="mb-4">
          <label className="block mb-1">Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
