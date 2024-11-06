import React, { useState, useEffect } from 'react';
import { useJobStore } from '../store/store';
import { FaRegEdit, FaRegTrashAlt, FaEye } from "react-icons/fa";
import ViewModal from './ViewModal';

const CompanyTableApplicants = ({user}) => {
  const [applicantsData, setApplicantsData] = useState([]);
  const { jobs, fetchJobs } = useJobStore();
  const [jobToView, setJobToView] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    const selectedJob = jobs.find((job) => job.id === user.uid);
    if (selectedJob && selectedJob.jobs) {
      const allApplicants = selectedJob.jobs.flatMap(job => job.applicants || []);
      setApplicantsData(allApplicants);
    }
  }, [jobs]);

  // View Handler
  const handleViewClick = (applicant) => {
    setJobToView(applicant);
    setIsViewModalOpen(true);
  };

  return (
    <div className="h-full pt-8 px-4 relative ml-64 w-full">
      <table className="divide-y divide-gray-200 bg-gray-300 w-full rounded-md">
        <thead>
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Applicant Name</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">View Resume</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applicantsData.length > 0 ? (
            applicantsData.map((applicant, index) => (
              <tr key={index}>
                <td className="p-3 whitespace-nowrap text-center">{applicant.name || "N/A"}</td>
                <td className="p-3 whitespace-nowrap text-center">{applicant.email || "N/A"}</td>
                <td className="p-3 whitespace-nowrap text-center">{applicant.jobTitle || "N/A"}</td>
                <td className="p-3 whitespace-nowrap text-center">
                  <button 
                    className="text-blue-600 hover:underline m-auto flex items-center gap-1" 
                    onClick={() => handleViewClick(applicant)}>
                    <FaEye /> View
                  </button>
                </td>
                <td className="p-3 whitespace-nowrap text-center">{applicant.status || "Pending"}</td>
                <td className="p-3 whitespace-nowrap text-center">
                  <button
                    className="px-3 py-1 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-green-600 transition duration-150 ease-in-out"
                    onClick={() => handleAcceptClick(applicant)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="ml-2 px-3 py-1 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                    onClick={() => handleRejectClick(applicant)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">NO DATA AVAILABLE</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* View Modal */}
      <ViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        initialData={jobToView || {}}
      />
    </div>
  );
};

export default CompanyTableApplicants;
