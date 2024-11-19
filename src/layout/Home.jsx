import { useAuthStore } from "../store/store";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import univ from "../assets/univ.jpg";
import Header from "./Header";
import Footer from "./Footer";
import TopRecommendation from "../components/TopRecommendation";
import React from "react";

const Home = () => {
  const { isAuth, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(user?.role === 'ADMIN' || user?.role === 'SADMIN') {
      navigate('/admin/dashboard')
    }
  }, [user])  

  return isAuth ? (
    <div className="App">
      <Header />
      <main>
        <section className="text-gray-600">
          <div className="container mx-auto flex flex-col items-center px-5 py-24 md:flex-row">
            <div className="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
              <h1 className="title-font mb-4 text-3xl font-medium text-gray-900 sm:text-4xl">
                Universidad de Manila OJT
              </h1>
              <p className="mb-8 mt-2 w-full text-sm text-gray-500">
                The On-the-Job Training (OJT) program at Universidad de Manila
                provides students with practical experience and professional
                skills in their chosen fields. This hands-on training bridges
                academic learning with real-world application, enhancing resumes
                and building connections with potential employers. Universidad
                de Manila&apos;s OJT ensures graduates are well-prepared for the
                job market.
              </p>
            </div>
            <div className="w-5/6 md:w-1/2 lg:w-full lg:max-w-lg">
              <img
                className="rounded object-cover object-center"
                alt="hero"
                src={univ}
              />
            </div>
          </div>
        </section>
        {user?.role === "STUDENT" && <TopRecommendation />}
      </main>
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
