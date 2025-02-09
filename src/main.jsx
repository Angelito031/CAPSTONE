import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./layout/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./components/ErrorPage.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Jobs from "./layout/Jobs.jsx";
import Profile from "./layout/Profile.jsx";
import ProfileEdit from "./layout/ProfileEdit.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import Admin from "./layout/Admin.jsx";
import AdminTable from "./layout/AdminTable.jsx";
import AdminCreateAccount from "./layout/AdminCreateAccount.jsx";
import StudentListing from "./layout/StudentListing.jsx";
import ViewStudentProfile from "./components/ViewStudentProfile.jsx";
import SortedJobs from "./components/SortedJobs.jsx";
import JobDetails from "./components/JobDetails.jsx";
import CompanyListing from "./components/CompanyListing.jsx";
import ViewCompanyProfile from "./components/ViewCompanyProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/jobs",
    element: 
    <ProtectedRoute requiredRole="STUDENT">
      <Jobs />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/jobs/filter/:filter",
    element: 
    <ProtectedRoute requiredRole="STUDENT">
      <SortedJobs />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/view/job/:jobId",
    element: 
    <ProtectedRoute requiredRole="STUDENT">
      <JobDetails />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/jobs/search/:searchQuery",
    element: 
    <ProtectedRoute requiredRole="STUDENT">
      <SortedJobs />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/students",
    element:
    <ProtectedRoute requiredRole="COMPANY">
      <StudentListing />,
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/view/student/:studentId",
    element: 
    <ProtectedRoute requiredRole="COMPANY">
     <ViewStudentProfile />,
   </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/companies",
    element: 
    <ProtectedRoute requiredRole="STUDENT">
      <CompanyListing />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/view/company/:companyId",
    element: 
    <ProtectedRoute requiredRole="STUDENT">
      <ViewCompanyProfile />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/:userId",
    element: 
    <ProtectedRoute requiredRole="STUDENT">
      <Profile />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/:userId/profile",
    element: 
    <ProtectedRoute requiredRole="COMPANY">
      <Profile />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/:userId/dashboard",
    element: 
    <ProtectedRoute requiredRole="COMPANY">
      <Profile />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/:userId/create/job",
    element: 
    <ProtectedRoute requiredRole="COMPANY">
      <Profile />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/:userId/table/jobs",
    element: 
    <ProtectedRoute requiredRole="COMPANY">
      <Profile />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/:userId/table/applicants",
    element: 
    <ProtectedRoute requiredRole="COMPANY">
      <Profile />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/:userId/edit",
    element: 
    <ProtectedRoute requiredRole="COMPANY">
      <Profile />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/edit/:userId",
    element: 
    <ProtectedRoute requiredRole="STUDENT">
      <ProfileEdit />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/dashboard",
    element: 
    <ProtectedRoute requiredRole={["ADMIN", "SADMIN"]}>
      <Admin />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  }, 
  {
    path: "/admin/table/users",
    element: 
    <ProtectedRoute requiredRole={["ADMIN", "SADMIN"]}>
      <AdminTable />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/table/companies",
    element: 
    <ProtectedRoute requiredRole={["ADMIN", "SADMIN"]}>
      <AdminTable />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/table/jobs",
    element: 
    <ProtectedRoute requiredRole={["ADMIN", "SADMIN"]}>
      <AdminTable />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/create/company",
    element: 
    <ProtectedRoute requiredRole={["ADMIN", "SADMIN"]}>
      <AdminCreateAccount/>
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/create/user",
    element: 
    <ProtectedRoute requiredRole={["ADMIN", "SADMIN"]}>
      <AdminCreateAccount/>
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/create/admin",
    element: 
    <ProtectedRoute requiredRole={"SADMIN"}>
      <AdminCreateAccount/>
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot",
    element: <ForgotPassword />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
