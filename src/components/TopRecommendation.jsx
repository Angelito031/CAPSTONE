import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Job from "./Job";
import Fuse from "fuse.js";
import { useAuthStore, useJobStore } from "../store/store";

const TopRecommendation = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const { jobs, fetchJobs } = useJobStore();
  const { user } = useAuthStore();
  const userSkills = user?.resume?.skills || [];

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Flatten the jobs structure if they are nested within objects
  const flattenedJobs = jobs.flatMap((job) => job.jobs || []);

  // Use Fuse.js for fuzzy search matching based on skills
  useEffect(() => {
    const fuse = new Fuse(flattenedJobs, {
      keys: ["skills", "jobTitle", "jobDescription", "location"],
      threshold: 0.3, // Adjust threshold for fuzziness
    });

    const filtered = fuse.search(userSkills.join(" ")); // Search for skills
    const topFilteredJobs = filtered.map(result => result.item).slice(0, 4); // Limit to top 4 jobs
    setFilteredJobs(topFilteredJobs);
  }, [flattenedJobs, userSkills]);

  return (
    <section className="body-font text-gray-600 shadow-md">
      <div className="container mx-auto px-5 py-24">
        <div className="flex flex-col">
          <div className="h-1 overflow-hidden rounded bg-gray-200">
            <div className="h-full w-24 bg-indigo-500"></div>
          </div>
          <div className="mb-12 flex flex-col flex-wrap py-6 sm:flex-row">
            <h1 className="title-font mb-2 text-2xl font-medium text-gray-900 sm:mb-0 sm:w-2/5">
              Recommended Jobs
            </h1>
            <Link
              to={"/recommendation"}
              className="pl-0 text-right text-base leading-relaxed text-blue-400 hover:underline sm:w-3/5 sm:pl-10"
            >
              View More
            </Link>
          </div>
        </div>
        <div className="-mx-4 -mb-10 -mt-4 px-1 flex flex-wrap sm:-m-4">
          {filteredJobs.map((job) => (
            <Job key={job.jobUid} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRecommendation;
