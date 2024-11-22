import React, { useState, useEffect, useMemo } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Job from "../components/Job";
import { useJobStore, useAuthStore } from "../store/store";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import Fuse from "fuse.js";

const SortedJobs = () => {
  const { user } = useAuthStore();
  const { jobs, fetchJobs } = useJobStore();
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  const [isLoading, setIsLoading] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const userSkills = useMemo(() => user?.resume?.skills || [], [user]);
  const acceptedJobs = useMemo(() => {
    return jobs.flatMap((job) => job.jobs || []).filter((job) => job.status === "ACCEPTED");
  }, [jobs]);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setIsLoading(true);
        await fetchJobs();
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobData();
  }, [fetchJobs]);

  useEffect(() => {
    let updatedJobs = [...acceptedJobs];

    if (lastSegment === "asc" || lastSegment === "desc") {
      updatedJobs.sort((a, b) => {
        const aApplicants = a.applicants || [];
        const bApplicants = b.applicants || [];
        return lastSegment === "asc"
          ? aApplicants.length - bApplicants.length
          : bApplicants.length - aApplicants.length;
      });
    } else if (lastSegment === "rec" && userSkills.length > 0) {
      const normalizedUserSkills = userSkills.map((skill) => skill.toLowerCase());
      const normalizedJobs = acceptedJobs.map((job) => ({
        ...job,
        skills: job.skills.map((skill) => skill.toLowerCase()),
      }));

      const fuse = new Fuse(normalizedJobs, {
        keys: ["skills", "jobTitle", "jobDescription", "location"],
        threshold: 0.5,
      });

      const searchQuery = normalizedUserSkills.join(" ");
      const filtered = fuse.search(searchQuery);
      updatedJobs = filtered.map((result) => result.item);
    }

    setFilteredJobs(updatedJobs);
  }, [acceptedJobs, lastSegment, userSkills]);

  const handleInputChange = (event) => setSearchQuery(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchQuery) return;

    const fuse = new Fuse(acceptedJobs, {
      keys: ["skills", "jobTitle", "jobDescription", "location"],
      threshold: 0.4,
    });

    const results = fuse.search(searchQuery);
    setFilteredJobs(results.map((result) => result.item));
  };

  const handleCategoryChange = (event) => {
    navigate(`/jobs/filter/${event.target.value}`);
  };

  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="text-gray-600 body-font">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 lg:gap-6">
              <select
                name="category"
                id="category"
                onChange={handleCategoryChange}
                className="w-full sm:w-auto lg:w-1/4 rounded border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
              >
                <option value="all">ALL</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
                <option value="rec">Recommendation</option>
              </select>
              <SearchBox
                searchQuery={searchQuery}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                wsize="w-full sm:w-3/5 lg:w-2/5"
              />
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-4 ml-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
              {isLoading ? (
                <div className="col-span-full text-center text-gray-500">Loading...</div>
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <Job key={job.jobUid || index} {...job} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No jobs available.
                </div>
              )}
            </div>
          </div>

        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SortedJobs;
