import React, { useState, useEffect } from 'react';
import { useJobStore } from '../store/store';
import { FaRegEdit, FaRegTrashAlt, FaEye } from "react-icons/fa";
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import ViewModal from './ViewModal';

const CompanyTableJobs = ({ user }) => {
  const [data, setData] = useState([]);
  const { jobs, fetchJobs, deleteJob, updateJob } = useJobStore();
  const [jobToDelete, setJobToDelete] = useState(null);
  const [jobToView, setJobToView] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of jobs per page
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    const filteredJobs = jobs.find((job) => job.id === user.uid);
    setData(filteredJobs && filteredJobs.jobs ? filteredJobs.jobs : []);
  }, [jobs]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Delete Handler
  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (jobToDelete) {
      await deleteJob(user.uid, jobToDelete.jobUid);
      fetchJobs();
      setIsDeleteModalOpen(false);
      setJobToDelete(null);
    }
  };

  // Edit Handler
  const handleEditClick = (job) => {
    setJobToEdit(job);
    setIsEditModalOpen(true);
  };

  // View Handler
  const handleViewClick = (job) => {
    setJobToView(job);
    setIsViewModalOpen(true);
  };

  const handleSaveEdit = async (updatedJobData) => {
    if (jobToEdit) {
      await updateJob(user.uid, jobToEdit.jobUid, updatedJobData);
      fetchJobs();
      setIsEditModalOpen(false);
      setJobToEdit(null);
    }
  };

  return (
    <div className="h-full pt-8 px-4 relative sm:ml-32 lg:ml-14 w-full">
      <table className="divide-y divide-gray-200 bg-gray-300 w-full rounded-md">
        <thead>
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Job Title</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:block">View Full Job</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData && paginatedData.length > 0 ? (
            paginatedData.map((job, index) => (
              <tr key={index}>
                <td className="p-3 whitespace-nowrap text-center">
                  {job.jobTitle ? job.jobTitle.slice(0, 10) + (job.jobTitle.length > 10 ? "..." : "") : "N/A"}
                </td>
                <td className="p-3 whitespace-nowrap text-center hidden lg:block">
                  <button
                    className="text-blue-600 hover:underline m-auto flex items-center gap-1"
                    onClick={() => handleViewClick(job)}
                  >
                    <FaEye /> View
                  </button>
                </td>
                <td className="p-3 whitespace-nowrap text-center hidden sm:table-cell">{job.status}</td>
                <td className="p-3 whitespace-nowrap text-center">{job.applicants ? job.applicants.length : 0} / {job.limit}</td>
                <td className="p-3 whitespace-nowrap text-center">
                  <button
                    className="px-3 py-1 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-green-600 transition duration-150 ease-in-out"
                    onClick={() => handleEditClick(job)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="ml-2 px-3 py-1 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                    onClick={() => handleDeleteClick(job)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">NO DATA AVAILABLE</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 mx-1 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={confirmDelete}
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        initialData={jobToEdit || {}}
      />

      {/* View Modal */}
      <ViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        initialData={jobToView || {}}
      />
    </div>
  );
};

export default CompanyTableJobs;
