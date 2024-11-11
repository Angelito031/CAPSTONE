import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/store'
import userdefaultimg from "../assets/user-default-icon.jpg";
import loading from "../assets/loading.gif";
import { FaArrowLeft, FaMessage, FaEye } from 'react-icons/fa6';
import ViewResume from './ViewResume';

const ViewStudentProfile = () => {
    const { fetchUsersPublic } = useUserStore();
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // Initially set to null
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const fetchedUsers = await fetchUsersPublic();
                if (Array.isArray(fetchedUsers)) {
                    const filteredUser = fetchedUsers.find(user => user.uid === lastSegment);
                    setUser(filteredUser || null); // Set user to null if not found
                } else {
                    console.error("Fetched data is not an array:", fetchedUsers);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        
        getUsers();
    }, [fetchUsersPublic, lastSegment]);

    // Handle Resume view
    const handleViewResume = () => {
        setIsResumeOpen(true);
    };

    const handleCloseResume = () => {
        setIsResumeOpen(false);
    };

    // Handle Message action
    const handleMessage = () => {
        console.log("Message clicked");
        // Implement message functionality here
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <img src={loading} alt="Loading" className="w-20 h-20" />
                <h4>LOADING....</h4>
            </div>
        );
    }

    return (
        <div className='h-full pt-8 px-4 relative w-full'>
            <div className='flex justify-between'>
                <button onClick={() => navigate(-1)} className="text-white h-5 lg:h-fit px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-600 shadow hover:shadow-lg font-extralight lg:font-medium transition transform hover:-translate-y-0.5 mb-2 flex justify-center items-center">
                    <FaArrowLeft className='mr-2'/>BACK
                </button>
                <div className='flex justify-end items-center gap-3'>
                    <button onClick={handleViewResume} className="text-white h-5 lg:h-fit px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 shadow hover:shadow-lg font-extralight lg:font-medium transition transform hover:-translate-y-0.5 mb-2 flex justify-center items-center">
                        <FaEye className='mr-2'/>RESUME
                    </button>
                    <button onClick={handleMessage} className="text-white h-5 lg:h-fit px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 shadow hover:shadow-lg font-extralight lg:font-medium transition transform hover:-translate-y-0.5 mb-2 flex justify-center items-center">
                        <FaMessage className='mr-2'/>MESSAGE
                    </button>
                </div>
            </div>

            <div className="h-fit lg:w-full xl:w-2/7 sm:w-full md:w-2/3 bg-white shadow-lg transform duration-200 easy-in-out">
                <div className="h-32 overflow-hidden">
                    <img className="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                </div>
                <div className="flex justify-center px-5 -mt-12">
                    <img className="h-32 w-32 bg-white p-2 rounded-full" src={user.profile || userdefaultimg} alt="User Profile" />
                </div>
                <div className="">
                    <div className="text-center px-14">
                        <h2 className="text-gray-800 text-3xl font-bold">{user.firstname + " " + user.lastname}</h2>
                        <p className="text-gray-500 text-sm">{user.location}</p>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                        <hr className="mt-6" />
                        <p className="mt-2 pb-3 text-gray-500 text-sm">{user.description}</p>
                    </div>
                </div>
            </div>

            {/* Resume Modal */}
            {isResumeOpen && (
                <div className="absolute h-fit inset-0 bg-black bg-opacity-50 p-4 z-50">
                    <button onClick={handleCloseResume} className="text-gray-500 hover:text-gray-700 bg-white mb-4 p-2 rounded-md relative left-4 top-4 right-4">Close</button>
                    <div className="bg-white p-6 rounded-lg shadow-lg mt-3 ">
                        <ViewResume user={user} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewStudentProfile;
