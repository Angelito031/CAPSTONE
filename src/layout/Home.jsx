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
    if (user?.role === "ADMIN" || user?.role === "SADMIN") {
      navigate("/admin/dashboard");
    }
  }, [user, navigate]);

  return isAuth ? (
    <div className="App flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="text-gray-600">
          <div className="container mx-auto flex flex-col items-center px-4 py-12 sm:px-8 sm:py-16 md:flex-row">
            {/* Text Section */}
            <div className="mb-10 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-12 md:text-left lg:pr-20">
              <h1 className="title-font mb-4 text-2xl font-medium text-gray-900 sm:text-3xl md:text-4xl">
                Universidad de Manila OJT
              </h1>
              <p className="mb-6 mt-2 text-sm text-gray-500 sm:text-base md:text-lg lg:mb-8">
                The On-the-Job Training (OJT) program at Universidad de Manila
                provides students with practical experience and professional
                skills in their chosen fields. This hands-on training bridges
                academic learning with real-world application, enhancing resumes
                and building connections with potential employers. Universidad
                de Manila&apos;s OJT ensures graduates are well-prepared for the
                job market.
              </p>
            </div>
            {/* Image Section */}
            <div className="w-5/6 md:w-1/2 lg:w-full lg:max-w-2xl">
              <img
                className="h-auto max-h-[400px] w-full rounded object-cover object-center md:max-h-[500px]"
                alt="hero"
                src={univ}
              />
            </div>
          </div>
        </section>
        {/* Conditional Rendering for Top Recommendations */}
        {user?.role === "STUDENT" && <TopRecommendation />}
      </main>
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
