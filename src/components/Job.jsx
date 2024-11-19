import React from 'react';
import codingimg from '../assets/coding.jpg';
import { Link } from 'react-router-dom';

const Job = ({ jobUid, jobTitle, limit, location, jobDescription = "", applicants = [] }) => {
  const applicantCount = Array.isArray(applicants) ? applicants.length : 0;
  const maxDescriptionLength = 50; 
  
  const shortDescription =
    jobDescription.length > maxDescriptionLength
      ? jobDescription.slice(0, maxDescriptionLength) + "..."
      : jobDescription;

  return (
    <div className="max-w-52 w-full m-2 bg-white rounded-lg shadow-md p-6">
      <div className="w-full h-32 bg-gray-300 rounded-md mb-4 flex items-center justify-center overflow-hidden">
        <img src={codingimg} alt="Job Image" className="w-full h-full object-fill p-4 rounded-md" />
      </div>
      <div className="text-center mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 flex justify-between">
          {"Applicants: " + applicantCount + "/" + limit} <span>{location}</span>
        </h3>
        <h2 className="text-lg font-semibold mb-1">{jobTitle}</h2>
        <p className="text-xs text-gray-500 mb-4 break-words truncate max-w-xs">
            {shortDescription}
        </p>
        <Link
          to={`/view/job/${jobUid}`}
          className="text-blue-500 text-sm font-semibold hover:text-blue-600"
        >
          View Job
        </Link>
      </div>
    </div>
  );
};

export default Job;
