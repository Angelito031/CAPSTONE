import React, { useState } from 'react';
import { FaUser, FaBuilding } from 'react-icons/fa';
import { MdOutlineWork } from 'react-icons/md';
import StatsCard from './StatsCard';
import { collection, count, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect } from 'react';

const AdminDashboard = () => {
    const [usersCount, setUsersCount] = useState(0);
    const [companiesCount, setCompaniesCount] = useState(0);
    const [jobsCount, setJobsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const usersRef = collection(db, "users");
    const jobsRef = collection(db, "jobs");

    useEffect(() => {
        setIsLoading(true);
        const usersquery = query(usersRef, count(), where("role", "==", "STUDENT"));
        const usersquerySnapshot = getDocs(usersquery);
        usersquerySnapshot.then((userquerySnapshot) => {
            setUsersCount(userquerySnapshot.size)
        })

        const companiesquery = query(usersRef, count(), where("role", "==", "COMPANY"));
        const companiesquerySnapshot = getDocs(companiesquery);
        companiesquerySnapshot.then((companiesquerySnapshot) => {
            setCompaniesCount(companiesquerySnapshot.size)
        })

        const jobsquery = query(jobsRef, count());
        const jobsquerySnapshot = getDocs(jobsquery);
        jobsquerySnapshot.then((jobsquerySnapshot) => {
            setJobsCount(jobsquerySnapshot.size)
        })
        setIsLoading(false);
    }, [usersCount])

  return (
    <div className="bg-gray-200 h-full relative p-8 ml-64 w-full">
      <div className="grid gap-4 lg:gap-8 md:grid-cols-3">
        <StatsCard
          icon={FaUser}
          title="Users"
          value={isLoading ? "Loading..." : usersCount}
        />
        <StatsCard
          icon={FaBuilding}
          title="Companies"
          value={isLoading ? "Loading..." : companiesCount}
        />
        <StatsCard
          icon={MdOutlineWork}
          title="Jobs"
          value={isLoading ? "Loading..." : jobsCount}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
