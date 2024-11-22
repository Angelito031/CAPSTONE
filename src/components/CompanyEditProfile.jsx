import React, { useState, useRef, useEffect } from "react";
import CreateInputField from "./CreateInputField";
import { useUserStore, useAuthStore } from "../store/store";
import { bouncy } from "ldrs";
import EditTextArea from "./EditTextArea";

const CompanyEditProfile = () => {
  const { updateUser, message, success, setMessage, setSuccess } = useUserStore();
  const { user, setUser } = useAuthStore();
  const messageRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyname: "",
    email: "",
    location: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  bouncy.register();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateUser(formData, image); // Pass image along with formData
      await setUser({ ...user, ...formData });
      setMessage("Profile updated successfully");
      setSuccess(true);
    } catch (error) {
      console.error("Failed to update user", error.message);
      setMessage("Failed to update profile");
      setSuccess(false);
    } finally {
      setIsLoading(false);
      setFormData({
        companyname: "",
        email: "",
        location: "",
        description: "",
      });
      setImage(null);
      setTimeout(() => {
        setMessage(null);
        setSuccess(null);
      }, 1500);
    }
  };

  useEffect(() => {
    if (messageRef.current && message) {
      messageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [message]);

  return (
    <div className="h-full pt-8 px-4 w-full max-w-screen-lg mx-auto">
      <form
        className="w-full max-w-2xl mx-auto flex flex-col shadow-md p-4 rounded-lg bg-white"
        method="POST"
        onSubmit={handleSubmit}
      >
        <CreateInputField
          type="text"
          name="companyname"
          id="company_name"
          label="Company Name"
          value={formData.companyname}
          onChange={handleChange}
        />
        <CreateInputField
          type="email"
          name="email"
          id="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        <CreateInputField
          type="text"
          name="location"
          id="location"
          label="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <h5 className="mt-2 font-semibold">Company Description</h5>
        <EditTextArea
          name="description"
          placeholder="Company Description"
          value={formData.description}
          handleInputChange={handleChange}
        />

        <h5 className="mt-4 font-semibold">Upload Company Logo</h5>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-2"
        />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="mt-2 w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover mx-auto"
          />
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`text-white bg-blue-700 ${
            isLoading ? "" : "hover:bg-blue-800"
          } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mt-4`}
        >
          {isLoading ? <l-bouncy color="white" size="25" speed="1" /> : "Submit"}
        </button>
      </form>

      <div
        ref={messageRef}
        className={`w-full max-w-2xl mx-auto my-4 p-2 text-center rounded-lg ${
          message ? (success ? "bg-green-500" : "bg-red-500") : "hidden"
        }`}
      >
        <p className="text-white">{message || "An error occurred"}</p>
      </div>
    </div>
  );
};

export default CompanyEditProfile;
