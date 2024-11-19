import React, { useState } from 'react';
import { FaUser, FaBuilding } from 'react-icons/fa';
import { MdOutlineWork } from 'react-icons/md';
import StatsCard from './StatsCard';
import { collection, count, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useMemo } from 'react';
import { bouncy } from 'ldrs';
import { useJobStore } from '../store/store';

const AdminDashboard = () => {
    const [usersCount, setUsersCount] = useState(0);
    const [companiesCount, setCompaniesCount] = useState(0);
    const [jobsCount, setJobsCount] = useState(0);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { jobs, fetchJobs } = useJobStore(); // Zustand for jobs
    const usersRef = collection(db, "users");
    const flattenedJobs = useMemo(() => jobs.flatMap((job) => job.jobs || []), [jobs]);
    bouncy.register();

    useEffect(() => {
        setIsLoading(true);
        const usersQuery = query(usersRef, count(), where("role", "==", "STUDENT"));
        getDocs(usersQuery).then((userQuerySnapshot) => {
            setUsersCount(userQuerySnapshot.size);
        });

        const companiesQuery = query(usersRef, count(), where("role", "==", "COMPANY"));
        getDocs(companiesQuery).then((companiesQuerySnapshot) => {
            setCompaniesCount(companiesQuerySnapshot.size);
        });

        fetchJobs();
        setJobsCount(flattenedJobs.length);

        // Sort jobs by applicant count in descending order and keep only the top 10
        const sortedJobs = [...flattenedJobs]
            .sort((a, b) => (b.applicants?.length || 0) - (a.applicants?.length || 0))
            .slice(0, 10);

        setData(sortedJobs);
        setIsLoading(false);
    }, [usersCount, flattenedJobs, fetchJobs]);

    return (
        <div className="bg-gray-200 h-full relative p-8 ml-64 w-full">
            <div className="grid gap-4 lg:gap-8 md:grid-cols-3">
                <StatsCard
                    icon={FaUser}
                    title="Users"
                    value={isLoading ? <l-bouncy color="white" size="25" speed="1" /> : usersCount}
                />
                <StatsCard
                    icon={FaBuilding}
                    title="Companies"
                    value={isLoading ? <l-bouncy color="white" size="25" speed="1" /> : companiesCount}
                />
                <StatsCard
                    icon={MdOutlineWork}
                    title="Jobs"
                    value={isLoading ? <l-bouncy color="white" size="25" speed="1" /> : jobsCount}
                />
            </div>
            <table className="my-3 divide-y divide-gray-200 bg-gray-300 w-full rounded-md">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Job Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Application Limit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Applicants Count
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data && data.length > 0 ? (
                        data.map((job, index) => (
                            <tr key={index}>
                                <td className="p-3 whitespace-nowrap">{job.jobTitle}</td>
                                <td className="p-3 whitespace-nowrap">{job.email || 'N/A'}</td>
                                <td className="p-3 whitespace-nowrap text-center">{job.limit || 'N/A'}</td>
                                <td className="p-3 whitespace-nowrap">{job.status || 'N/A'}</td>
                                <td className="p-3 whitespace-nowrap text-center">
                                    {job.applicants ? job.applicants.length : 0}
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

export default AdminDashboard;
