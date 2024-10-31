import React, { useEffect } from 'react';
import FormGroup from './FormGroup';

const ViewModal = ({ isOpen, onClose, initialData }) => {
  // No state needed for a view modal, data comes from initialData

  // Populate the initial data to display whenever the modal is opened
  useEffect(() => {
    // You can log or perform any side effects if needed when initialData changes
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 m-10">
        <h2 className="text-xl font-semibold mb-4">View Job</h2>
        
        {/* Job Title */}
        <div className="mb-4">
          <label className="block mb-1">Job Title</label>
          <pre className="w-full p-2 border rounded">{initialData?.jobTitle || 'N/A'}</pre>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <pre className="w-full p-2 border rounded">{initialData?.email || 'N/A'}</pre>
        </div>

        {/* Job Description */}
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <pre className="w-full p-2 border rounded">{initialData?.jobDescription || 'N/A'}</pre>
        </div>

        {/* Limit and Location */}
        <FormGroup>
          <div className="mb-4">
            <label className="block mb-1">Limit</label>
            <pre className="w-full p-2 border rounded">{initialData?.limit || 'N/A'}</pre>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Location</label>
            <pre className="w-full p-2 border rounded">{initialData?.location || 'N/A'}</pre>
          </div>
        </FormGroup>

        {/* Skills */}
        <div className="mb-4">
          <label className="block mb-1">Skills</label>
          <pre className="w-full p-2 border rounded">{initialData?.skills ? initialData.skills.join(', ') : 'N/A'}</pre>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
