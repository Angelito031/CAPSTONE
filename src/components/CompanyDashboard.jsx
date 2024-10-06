import React,{useState} from 'react'
import { FaUser } from 'react-icons/fa';
import { MdOutlineWork } from 'react-icons/md';
import StatsCard from './StatsCard';
import { bouncy } from 'ldrs';

const CompanyDashboard = () => {
  const [applicantsCount, setApplicantsCount] = useState(0);
  const [jobsCount, setJobsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  bouncy.register();

  return (
    <div className="bg-gray-200 h-full relative p-8 ml-64 w-full">
    <div className="grid gap-4 lg:gap-8 md:grid-cols-3">
      <StatsCard
        icon={FaUser}
        title="Applicants"
        value={isLoading ? <l-bouncy color="white" size="25" speed="1" /> : applicantsCount}
      />
      <StatsCard
        icon={MdOutlineWork}
        title="Jobs"
        value={isLoading ? <l-bouncy color="white" size="25" speed="1" /> : jobsCount}
      />
    </div>
  </div>
  )
}

export default CompanyDashboard