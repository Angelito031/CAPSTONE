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

  // Extract user skills
  const userSkills = useMemo(() => user?.resume?.skills || [], [user]);

  // Flatten and filter jobs
  const acceptedJobs = useMemo(() => {
    return jobs.flatMap((job) => job.jobs || []).filter((job) => job.status === "ACCEPTED");
  }, [jobs]);

  // Fetch jobs on mount
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

  // Update filtered jobs based on last segment or recommendations
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
      // Fuse.js for recommendations
      const fuse = new Fuse(acceptedJobs, {
        keys: ["skills", "jobTitle", "jobDescription", "location"],
        threshold: 0.4,
      });

      const recommendations = fuse.search(userSkills.join(" "));
      updatedJobs = recommendations.map((result) => result.item);
    }

    setFilteredJobs(updatedJobs);
  }, [acceptedJobs, lastSegment, userSkills]);

  // Handle search input change
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Perform search based on query
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

  // Navigate to category filter
  const handleCategoryChange = (event) => {
    navigate(`/jobs/filter/${event.target.value}`);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-4 mx-auto">
            <div className="flex justify-between gap-4 lg:gap-0">
              <select
                name="category"
                id="category"
                onChange={handleCategoryChange}
                className="lg:w-1/4 w-fit rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200"
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
                wsize="lg:w-2/5"
              />
            </div>
          </div>

          <div className="container px-4 mx-auto my-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {isLoading ? (
                <div className="w-full text-center text-gray-500">Loading...</div>
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <Job key={job.jobUid || index} {...job} />
                ))
              ) : (
                <div className="w-full text-center text-gray-500">
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
