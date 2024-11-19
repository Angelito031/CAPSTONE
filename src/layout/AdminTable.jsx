import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useUserStore, useJobStore } from "../store/store";

const AdminTable = () => {
  const [data, setData] = useState([]); // State to store data for the table
  const [loading, setLoading] = useState(true); // Loading state
  const { users, fetchUsers } = useUserStore(); // Zustand for users
  const { jobs, fetchJobs } = useJobStore(); // Zustand for jobs

  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1]; // Get last part of URL

  // Memoize the flattened jobs array to avoid unnecessary recalculations
  const flattenedJobs = useMemo(() => jobs.flatMap((job) => job.jobs || []), [jobs]);

  // Fetch users and jobs on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchJobs()]);
      setLoading(false);
    };
    loadData();
  }, [fetchUsers, fetchJobs]);

  // Update table data based on URL segment
  useEffect(() => {
    let filteredData = [];
    if (lastSegment === "users" || lastSegment === "companies") {
      // Filter users based on the role and URL segment
      filteredData = users.filter(
        (user) =>
          (user.role === "STUDENT" && lastSegment === "users") ||
          (user.role === "COMPANY" && lastSegment === "companies")
      );
    } else if (lastSegment === "jobs") {
      // Use memoized flattenedJobs for "jobs" segment
      filteredData = flattenedJobs;
    }

    setData(filteredData);
  }, [users, flattenedJobs, lastSegment]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      {loading ? (
        <div className="ml-64 flex items-center justify-center">
          <p className="ml-96 text-2xl font-bold">Loading...</p>
        </div>
      ) : (
        <Table data={data} />
      )}
    </div>
  );
};

export default AdminTable;
