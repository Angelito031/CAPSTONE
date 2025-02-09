import { useEffect, useState } from "react";
import { useAuthStore } from "../store/store";
import univImage from "../assets/logo1.png";
import txtlogo from "../assets/txtlogo.png";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { dotWave } from "ldrs";

const Login = () => {
  const { login, servererror, setServerError, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState("");
  const [role , setRole] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  dotWave.register();

  useEffect(() => {
    setRole(user?.role)
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleCheck = () => {
    if (credentials.email === "") {
      setIsEmpty("Username is Empty, Please fill up all credentials");
      return false
    } else if (credentials.password === "") {
      setIsEmpty("Password is Empty, Please fill up all credentials");
      return false
    }
    return true
  };

  const handleLogin = async () => {
    setIsLoading(true);
    
    if (handleCheck()) {
      await login(credentials);
      if(!servererror){
        if(role === "ADMIN") {
          console.log(role)
          navigate("/admin");
        }
        navigate("/");
      }
    }
    
    setTimeout(() => {
      setIsEmpty("");
      setServerError(null);
    }, 5000);
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-screen py-16">
      <form className="mx-auto flex max-w-sm overflow-hidden rounded-lg bg-white shadow-lg lg:max-w-4xl">
        <img
          src={univImage}
          alt="Universidad De Manila"
          className="size-cover hidden lg:block lg:w-1/2 shadow-xl"
        />
        <div className="w-full p-8 lg:w-1/2">
          <div className="flex items-center justify-center h-28 z-0">
            <img src={txtlogo} className="w-full h-full object-cover" alt="" />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <p className="text-center text-xs uppercase text-gray-500">
              login with username
            </p>
            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              className="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-gray-200 px-4 py-2 text-gray-700 focus:outline-none"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="email@example.com"
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Password
              </label>
              <Link to="/forgot" className="text-xs text-gray-500">
                Forget Password?
              </Link>
            </div>
            <input
              className="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-gray-200 px-4 py-2 text-gray-700 focus:outline-none"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="*********"
            />
          </div>
          <div className="mt-8">
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-600"
            >
              {isLoading ? <l-dot-wave color="white" size='30' speed="1" /> : "Login"}
            </button>
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
          <div className="mt-4 flex items-center justify-between">
            <span className="w-1/5 border-b md:w-1/4"></span>
            <Link to="/register" className="text-xs uppercase text-gray-500">
              or <span className="text-blue-400 underline">sign up</span>
            </Link>
            <span className="w-1/5 border-b md:w-1/4"></span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
