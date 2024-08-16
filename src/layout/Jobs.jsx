import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Job from '../components/Job'
import { NavLink } from 'react-router-dom'
import { useSearchStore } from '../store/store'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import SearchBox from '../components/SearchBox'

const Jobs = () => {
   
    const { searchQuery, setSearchQuery, search } = useSearchStore();
    const navigate = useNavigate();
    const { isLoading, setIsLoading } = useState(false);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await search(searchQuery);
        // console.log(response);
        // if (response.status === 204) {
        //   navigate("/not-found");
        // } 
          navigate(`/jobs/search/${searchQuery}`);
        
      };

      const handleCategoryChange = async (event) => {
        console.log(event.target.value);
         event.preventDefault();
         const response = await search(event.target.value);
         navigate(`/jobs/filter/${event.target.value}`);
      }

    const jobs = [
        {
            id: 1,
            title: "Software Developer",
            company: "Apple",
            location: "California",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quisquam.",
        },
        {
            id: 2,
            title: "Software Developer",
            company: "Apple",
            location: "California",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quisquam.",
        },
        {
            id: 3,
            title: "Web Developer",
            company: "Apple",
            location: "California",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quisquam.",
        },
        {
            id: 4,
            title: "Software Developer",
            company: "Apple",
            location: "California",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quisquam.",
        },
        {
            id: 5,
            title: "Software Developer",
            company: "Apple",
            location: "California",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quisquam.",
        },
        {
            id: 6,
            title: "Software Developer",
            company: "Apple",
            location: "California",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quisquam.",
        },
        {
            id: 7,
            title: "Software Developer",
            company: "Apple",
            location: "California",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quisquam.",
        },
        {
            id: 8,
            title: "Software Developer",
            company: "Apple",
            location: "California",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quisquam.",
        },
    ];

  return (
    <div className='App'>
        <Header />
        <main> 
            <section className="text-gray-600 body-font">
                <div className='container px-5 py-4 mx-auto'>
                        <div className="flex justify-between gap-4 lg:gap-0">
                            <select name="category" id="category" onChange={handleCategoryChange} className="lg:w-1/4 w-fit rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200">
                                <option value="category">Category</option>
                                <option value="category" >Category</option>
                                <option value="category" >Category</option>
                                <option value="category" >Category</option>
                            </select>
                            <SearchBox searchQuery={searchQuery} handleInputChange={handleInputChange} handleSubmit={handleSubmit} wsize="lg:w-2/5"/>
                        </div>
                    </div>
                    <div className="container px-4 mx-auto my-2">
                        <div className="flex flex-wrap -m-4">
                            {jobs.map((job) => (
                                <Job key={job.id} {...job} />
                            ))}
                        </div>
                    </div>
            </section>
        </main>
        <Footer />
    </div>
)
}

export default Jobs