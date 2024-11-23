import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Job from "./Job";
import Fuse from "fuse.js";
import { useAuthStore, useJobStore } from "../store/store";

const TopRecommendation = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const { jobs, fetchJobs } = useJobStore();
  const { user } = useAuthStore();
  const userSkills = user?.resume?.skills || [];

  // Fetch jobs once when the component mounts
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Memoize flattened and accepted jobs to avoid unnecessary recalculations
  const acceptedJobs = useMemo(
    () =>
      jobs
        .flatMap((job) => job.jobs || [])
        .filter((job) => job.status === "ACCEPTED"),
    [jobs]
  );

  // Perform job filtering using Fuse.js
  useEffect(() => {
    if (acceptedJobs.length > 0 && userSkills.length > 0) {
      // Normalize skills to handle case sensitivity
      const normalizedUserSkills = userSkills.map((skill) =>
        skill.toLowerCase()
      );
      const normalizedJobs = acceptedJobs.map((job) => ({
        ...job,
        skills: job.skills.map((skill) => skill.toLowerCase()),
      }));

      const fuse = new Fuse(normalizedJobs, {
        keys: ["skills", "jobTitle", "jobDescription", "location"],
        threshold: 0.5, // Adjust threshold for fuzziness
      });

      const searchQuery = normalizedUserSkills.join(" "); // Combine normalized user skills
      const filtered = fuse.search(searchQuery);

      const topFilteredJobs = filtered.map((result) => result.item).slice(0, 5); // Limit to top 5 jobs
      setFilteredJobs(topFilteredJobs);
    } else {
      setFilteredJobs([]); // Reset if no matching jobs or skills
    }
  }, [acceptedJobs, userSkills]);

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
              to={"/jobs/filter/rec"}
              className="pl-0 text-right text-base leading-relaxed text-blue-400 hover:underline sm:w-3/5 sm:pl-10"
            >
              View More
            </Link>
          </div>
        </div>
        <div className="-mx-4 -mb-10 -mt-4 px-1 flex justify-center flex-wrap sm:-m-4">
          {user?.resume == null ? (
            <p className="text-center">Please Update Your Resume</p>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <Job key={job.jobUid} {...job} />)
          ) : (
            <p className="text-center">No Recommended Jobs Found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopRecommendation;
