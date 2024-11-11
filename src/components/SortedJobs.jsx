import React, { useState, useEffect } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Job from '../components/Job';
import { useSearchStore, useJobStore } from '../store/store';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBox from '../components/SearchBox';

const SortedJobs = () => {
  const { searchQuery, setSearchQuery, search } = useSearchStore();
  const { jobs, fetchJobs } = useJobStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [flattenedJobs, setFlattenedJobs] = useState([]);
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    setIsLoading(true);
    const fetchJobData = async () => {
        try {
          await fetchJobs();
      
          const flattenedJobs = jobs.flatMap((job) => job.jobs || []);
          const sortedJobs = [...flattenedJobs].sort((a, b) => {
            const aApplicants = a.applicants || [];
            const bApplicants = b.applicants || [];
            return lastSegment === 'asc' ? aApplicants.length - bApplicants.length : bApplicants.length - aApplicants.length;
          });
      
          setFlattenedJobs(sortedJobs);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        } finally {
          setIsLoading(false);
        }
      };

    fetchJobData();
  }, [fetchJobs, jobs]); // Dependency on fetchJobs and jobs

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await search(searchQuery);
      navigate(`/jobs/search/${searchQuery}`);
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = async (event) => {
    event.preventDefault();
    const category = event.target.value;
    setIsLoading(true);
    navigate(`/jobs/filter/${category}`);
    setIsLoading(false);
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
              ) : flattenedJobs && flattenedJobs.length > 0 ? (
                flattenedJobs.map((job) => <Job key={job.id} {...job} />)
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
