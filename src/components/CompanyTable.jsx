import React, { useState, useEffect } from 'react';
import { useJobStore } from '../store/store';
import { FaCheckSquare } from "react-icons/fa";
import { FaRectangleXmark } from "react-icons/fa6";


const CompanyTable = () => {
  const [data, setData] = useState([]);
  const { jobs, fetchJobs } = useJobStore();

  // Fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Update `data` based on the jobs fetched
  useEffect(() => {
    // Filter jobs by the document ID
    const filteredJobs = jobs.find((job) => job.id === "IPer8pdgZGVBOQAkbyVT8YiRMls2");
    
    // Check if filteredJobs exists and contains the jobs array
    if (filteredJobs && filteredJobs.jobs) {
      setData(filteredJobs.jobs);
    }
  }, [jobs]);

  console.log(data);

  return (
    <div className="h-full pt-8 px-4 relative ml-64 w-full">
      <table className="divide-y divide-gray-200 bg-gray-300 w-full rounded-md">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Skills
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applicants
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data && data.length > 0 ? (
            data.map((job, index) => (
              <tr key={index}>
                <td className="p-3 whitespace-nowrap">{job.jobTitle || "N/A"}</td>
                <td className="p-3 whitespace-nowrap">{job.jobDescription || "N/A"}</td>
                <td className="p-3 whitespace-nowrap">
                  {job.skills && job.skills.length > 0 ? job.skills.join(', ') : "N/A"}
                </td>
                <td className="p-3 whitespace-nowrap">{job.applicants ? job.applicants.length : 0}</td>
                <td className="p-3 whitespace-nowrap">
                  {/* Render buttons for actions */}
                  <button className="px-3 py-1 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-green-600 transition duration-150 ease-in-out">
                    <FaCheckSquare />
                  </button>
                  <button className="ml-2 px-3 py-1 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                    <FaRectangleXmark/>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                NO DATA AVAILABLE
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
