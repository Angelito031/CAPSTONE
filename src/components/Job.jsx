import React from 'react'
import codingimg from '../assets/coding.jpg'
import { Link } from 'react-router-dom'

const Job = ({id, title, company, location,  description}) => {
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-md lg:shadow-lg lg:shadow-gray-400 lg:hover:shadow-xl lg:hover:shadow-gray-700 lg:my-4">
        <a className="block relative h-48 rounded overflow-hidden">
        <img alt="Code Image" className="object-cover object-center w-full h-full block" src={codingimg}/>
        </a>
        <div className="mt-4">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 flex justify-between">{company} <span>{location}</span></h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">{title}</h2>
            <p className="mt-1">{description}</p>
            <Link to={`/job/${id}`} className="mt-3 inline-flex items-center text-indigo-500">
                View Job...
            </Link>
        </div>
    </div>
)
}

export default Job