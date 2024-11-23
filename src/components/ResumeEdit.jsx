import EditInputField from "../components/EditInputField";
import EditTextArea from "../components/EditTextArea";
import React, { useState, useEffect } from "react";
import { useUserStore, useAuthStore } from "../store/store";
import { FaPlus, FaTrash, FaArrowLeft } from "react-icons/fa";

const ResumeEdit = ({ setIsResumeOpen, setIsEditOpen}) => {
  const { user, setUser } = useAuthStore();
  const { updateResume } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [credentials, setCredentials] = useState({
    resume: {
      firstname: '',
      lastname: '',
      email: '',
      contactno: '',
      facebook: '',
      twitter: '',
      skills: [],
      description: '',
      projects: [],
      image: ''
    }
  });

  useEffect(() => {
    if (user?.resume) {
      setCredentials({
        resume: {
          ...user.resume,
          skills: user.resume.skills || [],
          projects: Array.isArray(user.resume.projects) ? user.resume.projects : [],
        },
      });
    }
  
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const capitalizedValue = (name === 'firstname' || name === 'lastname')
      ? value.charAt(0).toUpperCase() + value.slice(1)
      : value;
    setCredentials((prevCredentials) => ({
      resume: {
        ...prevCredentials.resume,
        [name]: capitalizedValue
      }
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      console.log("Image selected:", e.target.files[0]);
      setImage(e.target.files[0]);
    } else {
      console.error("No file selected.");
    }
  };
  

  const handleSkillChange = (index, e) => {
    const { value } = e.target;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    const newSkills = [...credentials.resume.skills];
    newSkills[index] = capitalizedValue;
    setCredentials((prevCredentials) => ({
      resume: {
        ...prevCredentials.resume,
        skills: newSkills
      }
    }));
  };

  const handleAddSkill = () => {
    setCredentials((prevCredentials) => ({
      resume: {
        ...prevCredentials.resume,
        skills: [...prevCredentials.resume.skills, '']
      }
    }));
  };

  const handleRemoveSkill = (index) => {
    setCredentials((prevCredentials) => ({
      resume: {
        ...prevCredentials.resume,
        skills: prevCredentials.resume.skills.filter((_, i) => i !== index)
      }
    }));
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const newProjects = [...credentials.resume.projects];
    newProjects[index] = {
      ...newProjects[index],
      [name]: value
    };
    setCredentials((prevCredentials) => ({
      resume: {
        ...prevCredentials.resume,
        projects: newProjects
      }
    }));
  };

  const handleAddProject = () => {
    setCredentials((prevCredentials) => ({
      resume: {
        ...prevCredentials.resume,
        projects: [...prevCredentials.resume.projects, { title: '', link: '', description: '' }]
      }
    }));
  };

  const handleRemoveProject = (index) => {
    setCredentials((prevCredentials) => ({
      resume: {
        ...prevCredentials.resume,
        projects: prevCredentials.resume.projects.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Image state before submission:", image);
    if (!image) {
      console.warn("No image uploaded, proceeding without it.");
    }
    await updateResume(credentials.resume, image || credentials.resume.image);
    await setUser({ ...user, resume: credentials.resume });
    setIsResumeOpen(false);
  };
  

  return (
    <section className="py-10 my-auto">
      <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center bg-gray-50/40">
          <div>
            <div className="flex justify-between">
                <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif mb-1 text-black">Resume Edit</h1>
                <button onClick={() => setIsEditOpen(false)} className="text-white h-5 lg:h-fit p-2 rounded-md bg-gray-500 hover:bg-gray-600 shadow hover:shadow-lg font-extralight lg:font-medium transition transform hover:-translate-y-0.5"><FaArrowLeft /></button>
            </div>
            
            <form onSubmit={handleSubmit}>

              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <EditInputField
                  type="text"
                  name="firstname"
                  id="firstName"
                  value={credentials.resume.firstname}
                  placeholder="First Name"
                  handleInputChange={handleInputChange}
                />
                <EditInputField
                  type="text"
                  name="lastname"
                  id="lastName"
                  value={credentials.resume.lastname}
                  placeholder="Last Name"
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <EditInputField
                  type="email"
                  name="email"
                  id="email"
                  value={credentials.resume.email}
                  placeholder="Email Address"
                  handleInputChange={handleInputChange}
                />
                <EditInputField
                  type="number"
                  name="contactno"
                  id="contactno"
                  value={credentials.resume.contactno}
                  placeholder="CP Number"
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <EditInputField
                  type="text"
                  name="facebook"
                  id="facebook"
                  value={credentials.resume.facebook}
                  placeholder="Facebook Link"
                  handleInputChange={handleInputChange}
                />
                <EditInputField
                  type="text"
                  name="twitter"
                  id="twitter"
                  value={credentials.resume.twitter}
                  placeholder="Twitter Link"
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <h2 className="text-lg font-poppins font-bold text-gray-700 my-2">Skills</h2>
                  <button
                    type="button"
                    className="text-white hover:bg-blue-800 my-2 bg-blue-900 rounded-md p-1"
                    onClick={handleAddSkill}
                  >
                    <FaPlus />
                  </button>
                </div>
                {credentials.resume.skills?.map((skill, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <EditInputField
                      type="text"
                      name={`skill-${index}`}
                      value={skill}
                      placeholder={`Skill ${index + 1} (e.g., JavaScript, React)`}
                      handleInputChange={(e) => handleSkillChange(index, e)}
                    />
                    <button
                      type="button"
                      className="ml-2 text-red-600 hover:text-red-800 bg-red-300 flex justify-center items-center p-1 rounded-md gap-1"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      DELETE
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <h2 className="text-lg font-poppins font-bold text-gray-700 my-2">Projects</h2>
                  <button
                    type="button"
                    className="text-white hover:bg-blue-800 my-2 bg-blue-900 rounded-md p-1"
                    onClick={handleAddProject}
                  >
                    <FaPlus />
                  </button>
                </div>
                {credentials.resume.projects?.map((project, index) => (
                  <div key={index} className="mb-4 p-2 border rounded-md">
                    <EditInputField
                      type="text"
                      name="title"
                      value={project?.title}
                      placeholder="Project Title"
                      handleInputChange={(e) => handleProjectChange(index, e)}
                    />
                    <EditInputField
                      type="text"
                      name="link"
                      value={project?.link}
                      placeholder="Project Link (if available)"
                      handleInputChange={(e) => handleProjectChange(index, e)}
                    />
                    <EditTextArea
                      name="description"
                      value={project?.description}
                      placeholder="Project Description"
                      handleInputChange={(e) => handleProjectChange(index, e)}
                    />
                    <button
                      type="button"
                      className="mt-2 text-red-600 hover:text-red-800 bg-red-300 flex justify-center items-center p-1 rounded-md gap-1"
                      onClick={() => handleRemoveProject(index)}
                    > 
                      DELETE
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              <h2 className="text-lg font-poppins font-bold text-gray-700 my-2">Description</h2>
              <EditTextArea
                  name="description"
                  value={credentials.resume.description}
                  placeholder="User Description"
                  handleInputChange={handleInputChange}
                />
              <EditInputField
                      type="file"
                      name="image"
                      placeholder="Image Upload"
                      handleInputChange={handleImageChange}
                    />
              <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                <button type="submit" className="w-full p-4">
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeEdit;
