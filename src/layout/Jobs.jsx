import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Job from "../components/Job";
import Fuse from "fuse.js";
import { useJobStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";

const Jobs = () => {
  const { jobs, fetchJobs } = useJobStore(); // Zustand action for fetching jobs
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [flattenedJobs, setFlattenedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [userSkills, setUserSkills] = useState(["React", "JavaScript", "CSS"]); // Example skills

  useEffect(() => {
    setIsLoading(true);
    const fetchJobData = async () => {
      try {
        await fetchJobs(); // Fetch jobs
        setFlattenedJobs(jobs.flatMap((job) => job.jobs || [])); // Flatten nested structure
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobData();
  }, [fetchJobs, jobs]);

  // Use Fuse.js for fuzzy search matching based on skills
  useEffect(() => {
    if (flattenedJobs.length === 0 || userSkills.length === 0) return;

    const fuse = new Fuse(flattenedJobs, {
      keys: ["skills", "jobTitle", "jobDescription", "location"],
      threshold: 0.3, // Adjust threshold for fuzziness
    });

    const filtered = fuse.search(userSkills.join(" ")); // Search for skills
    const topFilteredJobs = filtered.map((result) => result.item).slice(0, 4); // Limit to top 4 jobs
    setFilteredJobs(topFilteredJobs);
  }, [flattenedJobs, userSkills]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const fuse = new Fuse(flattenedJobs, {
        keys: ["skills", "jobTitle", "jobDescription", "location"],
        threshold: 0.3,
      });

      const results = fuse.search(searchQuery); // Search based on input query
      const searchResults = results.map((result) => result.item);
      setFilteredJobs(searchResults); // Update displayed jobs
      navigate(`/jobs/search/${searchQuery}`);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = async (event) => {
    const selectedCategory = event.target.value;
    setIsLoading(true);

    try {
      let filtered = [];
      if (selectedCategory === "rec") {
        // Show recommendations (top matches)
        filtered = filteredJobs;
      } else if (selectedCategory === "asc") {
        filtered = [...flattenedJobs].sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
      } else if (selectedCategory === "desc") {
        filtered = [...flattenedJobs].sort((a, b) => b.jobTitle.localeCompare(a.jobTitle));
      } else {
        filtered = flattenedJobs;
      }

      setFilteredJobs(filtered);
      navigate(`/jobs/filter/${selectedCategory}`);
    } catch (error) {
      console.error("Error during category filtering:", error);
    } finally {
      setIsLoading(false);
    }
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
                handleSubmit={handleSearchSubmit}
                wsize="lg:w-2/5"
              />
            </div>
          </div>

          <div className="container px-4 mx-auto my-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {isLoading ? (
                <div className="w-full text-center text-gray-500">Loading...</div>
              ) : filteredJobs && filteredJobs.length > 0 ? (
                filteredJobs.map((job) => <Job key={job.id} {...job} />)
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

export default Jobs;
