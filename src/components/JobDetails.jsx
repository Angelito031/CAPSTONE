import React, { useEffect, useState } from "react";
import { useAuthStore, useJobStore, useUserStore } from "../store/store"; 
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ApplicationModal from "./ApplicationModal";
import AlertModal from "./AlertModal"; 
import {v4 as uiidv4} from 'uuid';

const JobDetails = () => {
  const { jobs, fetchJobs, updateJob } = useJobStore((state) => ({
    jobs: state.jobs,
    fetchJobs: state.fetchJobs,
    updateJob: state.updateJob,
  }));
  const { user } = useAuthStore();
  const { fetchUsersPublic } = useUserStore();

  const [isModalOpen, setIsModalOpen] = useState(false); // Application modal state
  const [alert, setAlert] = useState({ isOpen: false, message: "" }); // Alert modal state
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [companyDetails, setCompanyDetails] = useState([]);
  const [hasApplied, setHasApplied] = useState(false); // State to track if the user has already applied
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
    fetchUsersPublic();

    const companyUid = jobs.find((job) =>
      job.jobs.find((sjob) => sjob.jobUid === lastSegment)
    )?.id;

    const company = useUserStore
      .getState()
      .users.find((user) => user.uid === companyUid);
    setCompanyDetails(company);

    const flattenedJobs = jobs.flatMap((job) => job.jobs || []);
    const currentJob = flattenedJobs.find((job) => job.jobUid === lastSegment);
    setFilteredJobs([currentJob]);

    // Check if the user has already applied
    if (currentJob && currentJob.applicants) {
      const alreadyApplied = currentJob.applicants.some(
        (applicant) => applicant.email === user?.email
      );
      setHasApplied(alreadyApplied);
    }
  }, [fetchJobs, fetchUsersPublic, jobs, lastSegment, user]);

  const handleApply = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
  
    const job = filteredJobs[0];
    const applicationuid = uiidv4();
  
    // Ensure `job` is valid
    if (!job) {
      setAlert({ isOpen: true, message: "Job details not found!" });
      return;
    }
  
    // Create the applicant object with fallback values
    const applicant = {
      email: user?.email || "N/A",
      name: `${user?.firstname || "N/A"} ${user?.lastname || "N/A"}`,
      contactno: user?.contactno || "N/A",
      uid: applicationuid || "N/A",
      status: "PENDING",
      resume: user?.resume || "N/A",
      jobTitle: job?.jobTitle || "Unknown Job Title", // Include the job title
    };
  
    try {
      // Update job applicants list in Firestore
      await updateJob(companyDetails?.uid, job.jobUid, {
        applicants: [...(job.applicants || []), applicant],
      });
  
      setAlert({ isOpen: true, message: "Application submitted successfully!" });
      setHasApplied(true); // Update state after successful application
    } catch (error) {
      console.error("Error applying for the job:", error);
      setAlert({ isOpen: true, message: "Failed to apply. Please try again." });
    }
  
    setIsModalOpen(false);
  };
  
  

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="text-white h-5 lg:h-fit px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-600 shadow hover:shadow-lg font-extralight lg:font-medium transition transform hover:-translate-y-0.5 my-2 mx-4 flex justify-center items-center"
      >
        <FaArrowLeft className="mr-2" />
        BACK
      </button>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">{filteredJobs[0]?.jobTitle}</h1>
        <h2 className="text-xl text-gray-700 mb-2">
          {companyDetails?.companyname}
        </h2>
        <h3 className="text-md text-gray-500 mb-1">{companyDetails?.email}</h3>
        <p className="text-sm text-gray-500 mb-4">{filteredJobs[0]?.location}</p>

        <h3 className="text-lg font-semibold mt-6">Full Job Description</h3>
        <p className="mb-4">{filteredJobs[0]?.jobDescription}</p>

        <h3 className="text-lg font-semibold mt-6">Required Skills</h3>
        <ul className="list-disc list-inside mb-4">
          {filteredJobs[0]?.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

        {hasApplied ? (
          <button
            className="mt-6 px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
            disabled
          >
            Already Applied
          </button>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Apply Now
          </button>
        )}
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleApply}
      >
        <p className="text-center text-lg">
          Are you sure you want to apply for this job?
        </p>
      </ApplicationModal>

      {/* Alert Modal */}
      <AlertModal
        isOpen={alert.isOpen}
        onClose={() => setAlert({ isOpen: false, message: "" })}
        message={alert.message}
      />
    </div>
  );
};

export default JobDetails;
