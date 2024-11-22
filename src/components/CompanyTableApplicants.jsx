import React, { useState, useEffect } from "react";
import { useJobStore, useUserStore } from "../store/store";
import { FaCheck, FaEye } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import ViewResume from "./ViewResume";
import { dotWave } from "ldrs";
import axios from "axios";

const CompanyTableApplicants = ({ user }) => {
  const [applicantsData, setApplicantsData] = useState([]);
  const { jobs, fetchJobs, updateApplicants } = useJobStore();
  const { fetchUsersPublic } = useUserStore();
  const [jobToView, setJobToView] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [loadingApplicant, setLoadingApplicant] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const applicantsPerPage = 8; // Limit applicants to 8 per page
  dotWave.register();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    const selectedJob = jobs.find((job) => job.id === user.uid);
    if (selectedJob?.jobs) {
      const allApplicants = selectedJob.jobs.flatMap((job) => job.applicants || []);
      setApplicantsData(allApplicants);
    }
  }, [jobs, user.uid]);

  const handleViewClick = (applicant) => {
    setJobToView(applicant);
    setIsViewModalOpen(true);
  };

  const handleCloseResume = () => {
    setIsViewModalOpen(false);
    setJobToView(null);
  };

  const handleStatusUpdate = async (applicantUid, status) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setLoadingApplicant((prevState) => ({ ...prevState, [applicantUid]: true }));

      const users = await fetchUsersPublic();
      if (!users) {
        throw new Error("Users not found");
      }

      const companyUid = jobs.find((job) =>
        job.jobs.some((sjob) => sjob.applicants.some((applicant) => applicant.uid === applicantUid))
      )?.id;

      const companyDetails = users.find((user) => user.uid === companyUid);

      const job = jobs
        .find((job) => job.id === companyUid)
        ?.jobs.find((job) => job.applicants.some((applicant) => applicant.uid === applicantUid));

      const jobUid = job?.jobUid;
      const jobTitle = job?.jobTitle;

      if (!companyUid || !jobUid) {
        throw new Error("Company or Job UID not found");
      }

      const applicant = applicantsData.find((app) => app.uid === applicantUid);
      if (applicant) {
        await updateApplicants(companyUid, jobUid, { ...applicant, status });
        setApplicantsData((prevData) =>
          prevData.map((app) =>
            app.uid === applicantUid ? { ...app, status } : app
          )
        );

        // Send status email using Axios
        await axios.post("http://127.0.0.1:9000/api/sendApplicantStatusEmail", {
          companyname: companyDetails.companyname,
          companyemail: companyDetails.email,
          email: applicant.email,
          name: applicant.name,
          jobTitle: jobTitle,
          status: status,
        });
      }
    } catch (error) {
      console.error("Error updating status or sending email:", error);
    } finally {
      setLoadingApplicant((prevState) => ({ ...prevState, [applicantUid]: false }));
    }
  };

  const totalPages = Math.ceil(applicantsData.length / applicantsPerPage);
  const paginatedApplicants = applicantsData.slice(
    (currentPage - 1) * applicantsPerPage,
    currentPage * applicantsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="h-full pt-8 px-4 relative sm:ml-32 lg:ml-14 w-full">
      <table className="divide-y divide-gray-200 bg-gray-300 w-full rounded-md">
        <thead>
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:block">
              Job Title
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
              Applicant Name
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:block">
              View Resume
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:block">
              Status
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedApplicants.length > 0 ? (
            paginatedApplicants.map((applicant, index) => (
              <tr key={index}>
                 <td className="p-3 whitespace-nowrap text-center hidden lg:block">
                  {applicant.jobTitle || "N/A"}
                </td>
                <td className="p-3 whitespace-nowrap text-center">
                  {applicant.name || "N/A"}
                </td>
                <td className="p-3 whitespace-nowrap text-center hidden lg:block">
                  <button className="text-blue-600 hover:underline m-auto flex items-center gap-1" onClick={()=>handleViewClick(applicant)}>
                    <FaEye /> View
                  </button>
                </td>
                <td className="p-3 whitespace-nowrap text-center">
                  {applicant.email ? applicant.email.slice(0, 10) + (applicant.name.length > 10 ? "..." : "") : "N/A"}
                </td>
                <td className="p-3 whitespace-nowrap text-center hidden sm:table-cell">
                  <span className="text-sm">{applicant.status || "Pending"}</span>
                </td>
                <td className="p-3 whitespace-nowrap text-center">
                  <button
                    className="px-3 py-2 lg:py-1 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-green-600 transition duration-150 ease-in-out"
                    onClick={() => handleStatusUpdate(applicant.uid, "ACCEPTED")}
                    disabled={!!loadingApplicant[applicant.uid]}
                  >
                    {loadingApplicant[applicant.uid] ? (
                      <l-dot-wave color="white" size="20" speed="1" />
                    ) : (
                      <FaCheck/>
                    )}
                  </button>
                  <button
                    className="ml-2 px-3 py-2 lg:py-1 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                    onClick={() => handleStatusUpdate(applicant.uid, "REJECTED")}
                    disabled={!!loadingApplicant[applicant.uid]}
                  >
                    {loadingApplicant[applicant.uid] ? (
                      <l-dot-wave color="white" size="20" speed="1" />
                    ) : (
                      <ImCross/>
                    )}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                NO DATA AVAILABLE
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 mx-1 rounded-md ${
              currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isViewModalOpen && (
        <div className="absolute h-fit inset-0 bg-black bg-opacity-50 p-2 z-50">
          <button
            onClick={handleCloseResume}
            className="text-gray-500 hover:text-gray-700 bg-white mb-4 p-1 rounded-md relative left-4 top-4 right-4"
          >
            Close
          </button>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-3">
            <ViewResume user={jobToView} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyTableApplicants;
