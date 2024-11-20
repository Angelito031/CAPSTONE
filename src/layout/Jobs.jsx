import React, { useState, useEffect, useMemo } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Job from "../components/Job";
import Fuse from "fuse.js";
import { useJobStore, useAuthStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";

const Jobs = () => {
  const { jobs, fetchJobs } = useJobStore(); // Zustand action for fetching jobs
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  const userSkills = user?.resume?.skills || [];

  // Memoize flattened and accepted jobs for better performance
  const flattenedJobs = useMemo(
    () => jobs.flatMap((job) => job.jobs || []),
    [jobs]
  );

  const acceptedJobs = useMemo(
    () => flattenedJobs.filter((job) => job.status === "ACCEPTED"),
    [flattenedJobs]
  );

  // Fetch jobs on component mount
  useEffect(() => {
    setIsLoading(true);
    fetchJobs().catch((error) => console.error("Error fetching jobs:", error)).finally(() => setIsLoading(false));
  }, [fetchJobs]);

  // Recommendation based on user skills
  useEffect(() => {
    if (flattenedJobs.length === 0 || userSkills.length === 0) {
      setFilteredJobs([]);
      return;
    }

    const fuse = new Fuse(flattenedJobs, {
      keys: ["skills", "jobTitle", "jobDescription", "location"],
      threshold: 0.5,
    });

    const results = fuse.search(userSkills.join(" "));
    setFilteredJobs(results.map((result) => result.item));
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

      const results = fuse.search(searchQuery);
      setFilteredJobs(results.map((result) => result.item));
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
          const topFilteredJobs = filtered.map((result) => result.item);
          setFilteredJobs(topFilteredJobs);
        } else {
          console.log("No matching jobs or skills available."); // Debugging log for no matches
          setFilteredJobs([]); // Reset if no matching jobs or skills
        }
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
console.log(filteredJobs);
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
              ) : filteredJobs.length > 0 ? (
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
