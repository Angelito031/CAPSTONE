import { Link, NavLink } from "react-router-dom";
import { useAuthStore, useUserStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png"
import { useEffect } from "react";
import React from "react";


const Header = () => {
  const {user, logout } = useAuthStore();
  const {users, fetchUsers, isFetching} = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFetching && users.length === 0) {
      fetchUsers();
    }
  }, [fetchUsers, isFetching, users.length]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="body-font text-gray-600 shadow-md ">
      <div className="container mx-auto flex flex-col flex-wrap items-center p-1 md:flex-row">
        <Link
          to={"/"}
          className="title-font mb-0 h-20 w-20 flex items-center font-medium text-gray-900 md:mb-0"
        >
          <img src={logo} alt="UDM Logo" className="h-full w-full object-fill"/>
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-4 md:mr-auto md:border-l md:border-gray-400 md:py-1 md:pl-4">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "mr-5 underline text-green-900 font-semibold shadow-sm hover:text-gray-900"
                : "mr-5 hover:text-gray-900"
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/jobs/filter/all"}
            className={({ isActive }) =>
              isActive
                ? "mr-5 underline text-green-900 font-semibold shadow-sm hover:text-gray-900"
                : "mr-5 hover:text-gray-900"
            }
          >
            Jobs
          </NavLink>
          {user.role === "STUDENT" ? (
            <NavLink
              to={"/companies"}
              className={({ isActive }) =>
                isActive
                  ? "mr-5 underline text-green-900 font-semibold shadow-sm hover:text-gray-900"
                  : "mr-5 hover:text-gray-900"
              }
            >
              Companies
            </NavLink>
          ) : user.role === "COMPANY" ? (
            <NavLink
              to={"/students"}
              className={({ isActive }) =>
                isActive
                  ? "mr-5 underline text-green-900 font-semibold shadow-sm hover:text-gray-900"
                  : "mr-5 hover:text-gray-900"
              }
            >
              Students
            </NavLink>
          ) : user.role === "SADMIN" ? (
            <NavLink
              to={"/students"}
              className={({ isActive }) =>
                isActive
                  ? "mr-5 underline text-green-900 font-semibold shadow-sm hover:text-gray-900"
                  : "mr-5 hover:text-gray-900"
              }
            >
              Students
            </NavLink> ) : null}
          <NavLink
            to={user?.role === "STUDENT" ? `/profile/${user.uid}` : `/profile/${user.uid}/profile`}
            className={({ isActive }) =>
              isActive
                ? "mr-5 underline text-green-900 font-semibold shadow-sm hover:text-gray-900"
                : "mr-5 hover:text-gray-900"
            }
          >
            Profile
          </NavLink>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-4 inline-flex items-center rounded border-0 bg-gray-100 px-3 py-1 text-base hover:bg-gray-200 focus:outline-none md:mt-0"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
