import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/store";

const Register = () => {
  const { register, success, setSuccess, servererror, setServerError } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const capitalizedValue = (name === 'firstname' || name === 'lastname')
      ? value.charAt(0).toUpperCase() + value.slice(1)
      : value;
    setCredentials({ ...credentials, [name]: capitalizedValue });
  };

  const handleCheck = () => {
    if (credentials.firstname === "") {
      setIsEmpty("First name is Empty, Please fill up all credentials");
      return false;
    } else if (credentials.lastname === "") {
      setIsEmpty("Last name is Empty, Please fill up all credentials");
      return false;
    } else if (credentials.email === "") {
      setIsEmpty("Email is Empty, Please fill up all credentials");
      return false;
    } else if (credentials.password === "") {
      setIsEmpty("Password is Empty, Please fill up all credentials");
      return false;
    } else if (credentials.password !== credentials.repassword) {
      setIsEmpty("Password does not match");
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (success) {
      setShowModal(true);
    }
  }, [success]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (handleCheck()) {
      try {
        await register(credentials);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }

    setTimeout(() => {
      setIsEmpty("");
      setServerError(null);
    }, 5000);

    setIsLoading(false);
  };

  const handleContinue = () => {
    setSuccess(false);
    setShowModal(false); 
    navigate("/login"); 
  };

  return (
    <div className={`h-screen w-screen py-10 ${showModal ? 'overflow-hidden' : ''}`}>
      <div className={`mx-auto flex relative max-w-sm flex-col overflow-hidden rounded-lg bg-white p-5 shadow-lg lg:max-w-4xl ${showModal ? 'blur-md pointer-events-none' : ''}`}>
        <h2 className="text-center text-2xl font-semibold uppercase text-gray-700">
          Student Registration Form
        </h2>
        <div className="mt-4 flex items-center justify-between">
          <span className="w-1/2 border-b border-slate-300 lg:w-1/4"></span>
          <p className="text-center text-xs uppercase text-gray-500">
            Register with your credentials
          </p>
          <span className="w-1/2 border-b border-slate-300 lg:w-1/4"></span>
        </div>
        <form action="post" onSubmit={handleRegister}>
          <div className="mt-4">
            <input
              className="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-gray-200 px-4 py-2 text-gray-700 focus:outline-none"
              type="text"
              name="firstname"
              value={credentials.firstname}
              onChange={handleInputChange}
              placeholder="Enter your Firstname"
            />
          </div>
          <div className="mt-4">
            <input
              className="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-gray-200 px-4 py-2 text-gray-700 focus:outline-none"
              type="text"
              name="lastname"
              value={credentials.lastname}
              onChange={handleInputChange}
              placeholder="Enter your Lastname"
            />
          </div>
          <div className="mt-4">
            <input
              className="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-gray-200 px-4 py-2 text-gray-700 focus:outline-none"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="Enter your Valid Email for verification"
            />
          </div>
          <div className="mt-4">
            <input
              className="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-gray-200 px-4 py-2 text-gray-700 focus:outline-none"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Enter your Password (Minimum 8 characters)"
              minLength={8}
            />
          </div>
          <div className="mt-4">
            <input
              className="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-gray-200 px-4 py-2 text-gray-700 focus:outline-none"
              type="password"
              name="repassword"
              value={credentials.repassword}
              onChange={handleInputChange}
              placeholder="Re-enter your Password"
              minLength={8}
            />
          </div>
          <div className="mt-8">
            <button
              disabled={isLoading}
              className="w-full rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-600"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
        <div className="mt-4 flex items-center justify-between">
          <span className="w-1/2 border-b border-slate-300 md:w-1/4"></span>
          <Link
            to="/login"
            className="text-center text-xs uppercase text-gray-500"
          >
            Already have an account?{" "}
            <span className="text-blue-400 underline">Login</span>
          </Link>
          <span className="w-1/2 border-b border-slate-300 md:w-1/4"></span>
        </div>
        <div
          className={
            isEmpty || servererror
              ? "my-3 h-fit w-full animate-pulse rounded bg-red-500 p-1 text-center"
              : "hidden"
          }
        >
          <p>{isEmpty || servererror}</p>
        </div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
          <div className="bg-cyan-100 h-32 w-72 absolute top-48 left-1/2 transform -translate-x-1/2 text-black font-bold rounded-md shadow-lg z-40">
            <p className="text-center mt-5">Email Verification has been sent to your email.</p>
            <button
              onClick={handleContinue}
              className="text-white h-10 lg:h-auto py-2 px-4 my-2 mx-20 uppercase rounded bg-green-700 hover:bg-green-800 shadow hover:shadow-lg font-extralight lg:font-medium transition transform hover:-translate-y-0.5"
            >
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
