import React, { useState, useEffect } from 'react';
import { useJobStore } from '../store/store';
import { FaRegEdit, FaRegTrashAlt, FaEye } from "react-icons/fa";
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import ViewModal from './ViewModal';

const CompanyTableJobs = ({user}) => {
  const [data, setData] = useState([]);
  const { jobs, fetchJobs, deleteJob, updateJob } = useJobStore();
  const [jobToDelete, setJobToDelete] = useState(null);
  const [jobToView, setJobToView] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    const filteredJobs = jobs.find((job) => job.id === user.uid);
    setData(filteredJobs && filteredJobs.jobs ? filteredJobs.jobs : []);
  }, [jobs]);

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
    <div className="h-full pt-8 px-4 relative ml-64 w-full">
      <table className="divide-y divide-gray-200 bg-gray-300 w-full rounded-md">
        <thead>
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Job Title</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">View Full Job</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data && data.length > 0 ? (
            data.map((job, index) => (
              <tr key={index}>
                <td className="p-3 whitespace-nowrap text-center">{job.jobTitle || "N/A"}</td>
                <td className="p-3 whitespace-nowrap text-center">
                  <button 
                    className="text-blue-600 hover:underline m-auto flex items-center gap-1" 
                    onClick={() => handleViewClick(job)}>
                    <FaEye /> View
                  </button>
                </td>
                <td className="p-3 whitespace-nowrap text-center">{job.status}</td>
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
