import React, { useEffect, useState } from 'react';
import { useJobStore, useUserStore } from '../store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const JobDetails = () => {
    const {jobs, fetchJobs } = useJobStore();
    const { users, fetchUsersPublic } = useUserStore();
    const [fillteredJobs, setFilteredJobs] = useState([]);
    const [companyDetails, setCompanyDetails] = useState([]);
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobs();
        fetchUsersPublic();
        const companyUid = jobs.find((job) => job.jobs.find(sjob => sjob.jobUid === lastSegment))?.id;
        const company = users.find((user) => user.uid === companyUid);
        setCompanyDetails(company);
        const flattenedJobs = jobs.flatMap((job) => job.jobs || []);
        setFilteredJobs(flattenedJobs.filter((job) => job.jobUid === lastSegment))
    }, [fetchJobs]);

  return (
  <div>
        <button onClick={() => navigate(-1)} className="text-white h-5 lg:h-fit px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-600 shadow hover:shadow-lg font-extralight lg:font-medium transition transform hover:-translate-y-0.5 my-2 mx-4 flex justify-center items-center">
             <FaArrowLeft className='mr-2'/>BACK
        </button>
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{fillteredJobs[0]?.jobTitle}</h1>
      <h2 className="text-xl text-gray-700 mb-2">{companyDetails?.companyname}</h2>
      <h3 className="text-md text-gray-500  mb-1">{companyDetails?.email}</h3>
      <p className="text-sm text-gray-500 mb-4">{fillteredJobs[0]?.location}</p>
      
      <h3 className="text-lg font-semibold mt-6">Full Job Description</h3>
      <p className="mb-4">{fillteredJobs[0]?.jobDescription}</p>
      
      <h3 className="text-lg font-semibold mt-6">Required Skills</h3>
      <ul className="list-disc list-inside mb-4">
        {fillteredJobs[0]?.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Apply Now
      </button>
    </div>
  </div>
    
  );
};

export default JobDetails;