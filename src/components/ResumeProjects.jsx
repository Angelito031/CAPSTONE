import { useAuthStore } from "../store/store";

const ResumeProjects = () => {
  const { user } = useAuthStore();
  const projectList = user?.resume?.projects || []; // Default to empty array

  const formatLink = (link) => {
    if (!link) return '';
    // Check if the link already has a protocol, otherwise prepend `http://`
    return link.startsWith('http://') || link.startsWith('https://') ? link : `http://${link}`;
  };

  return (
    <div className="py-3">
      <h2 className="text-lg font-poppins font-bold text-gray-700">Projects</h2>
      <div className="border-2 w-20 border-gray-700 my-3"></div>
      {projectList.length > 0 ? (
        <ul className="list-none ml-5">
          {projectList.map((project, index) => (
            <li key={index} className="text-gray-700 mb-4">
              <h5 className="text-md font-poppins font-bold text-gray-700">{project.title}</h5>
              {project.link && (
                <a
                  href={formatLink(project.link)}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {formatLink(project.link)}
                </a>
              )}
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No projects to display.</p>
      )}
    </div>
  );
};

export default ResumeProjects;
