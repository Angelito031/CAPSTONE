import { Link } from "react-router-dom";
import Job from "./Job";


const TopRecommendation = () => {
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
      title: "Software Developer",
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
   
  ];

  return (
    <section className="body-font text-gray-600 shadow-md"  >
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
          {jobs.map((job) => (
            <Job key={job.id} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRecommendation;
