import ProfilePicture from '../components/ProfilePicture';
import ProfileInfo from '../components/ProfileInfo';
import ProfileDescription from '../components/ProfileDescription';
import ProfileButtons from '../components/ProfileButtons';
import Header from '../layout/Header';
import Footer from './Footer';
import univ from "../assets/univ.jpg";
import Resume from '../components/Resume';
import { useState } from 'react';
import React from 'react';
import { useAuthStore } from '../store/store';
import CompanySidebar from '../components/CompanySidebar';
import CompanyDashboard from '../components/CompanyDashboard';
import { useLocation } from 'react-router-dom';
import CompanyProfile from '../components/CompanyProfile';
import CompanyCreateJob from '../components/CompanyCreateJob';
import CompanyTable from '../components/CompanyTable';
import CompanyEditProfile from '../components/CompanyEditProfile';

const Profile = () => {
    const { user } = useAuthStore();
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    if(user.role === "COMPANY"){
        return (
        <>
            <Header/>
            <main className='flex'>
                <CompanySidebar user={user}/>
                {lastSegment === "dashboard" ? <CompanyDashboard user={user}/> 
                : lastSegment === "profile" ? <CompanyProfile user={user} /> 
                : lastSegment === "job" ? <CompanyCreateJob /> 
                : lastSegment === "jobs" ? <CompanyTable /> : <CompanyEditProfile />}
            </main>
        </>);
    }
    return (
        <div className='App'>
            {isResumeOpen ? (<Resume setIsResumeOpen={setIsResumeOpen} />) : (
                <>
                    <Header />
                        <main>
                            <section className="px-16">
                                <div className="relative p-8 bg-gray-50 shadow-lg shadow-gray-400 mt-3">
                                    <div>
                                        <img src={univ} alt="Profile Background" className='w-full h-60' />
                                    </div>
                                    <div className='flex lg:items-center flex-wrap'>
                                        <ProfileButtons setIsResumeOpen={setIsResumeOpen} />
                                        <ProfilePicture />
                                    </div>
                                    <ProfileInfo />
                                    <ProfileDescription />
                                </div>
                            </section>
                        </main>
                    <Footer />
                </>
            )}
            
        </div>
    );
};

export default Profile;
