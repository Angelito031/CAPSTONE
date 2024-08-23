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
    children: [
      {
        path: "/jobs/filter/:filter",
        element: 
        <ProtectedRoute requiredRole="STUDENT">
          <Jobs />
        </ProtectedRoute>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/jobs/search/:searchQuery",
        element: 
        <ProtectedRoute requiredRole="STUDENT">
          <Jobs />
        </ProtectedRoute>,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/job/:jobId",
    element: 
    <ProtectedRoute requiredRole="STUDENT">
      <Home />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  
  {
    path: "/students",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/student/:studentId",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/companies",
    element: 
    <ProtectedRoute requiredRole="STUDENT">
      <Home />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/company/:companyId",
    element: 
    <ProtectedRoute requiredRole="STUDENT">
      <Home />
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
    <ProtectedRoute requiredRole="ADMIN">
      <Admin />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  }, 
  {
    path: "/admin/table/users",
    element: 
    <ProtectedRoute requiredRole="ADMIN">
      <AdminTable />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/table/companies",
    element: 
    <ProtectedRoute requiredRole="ADMIN">
      <AdminTable />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/table/jobs",
    element: 
    <ProtectedRoute requiredRole="ADMIN">
      <AdminTable />
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
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
