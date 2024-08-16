import {  useParams } from "react-router-dom";
import { useAuthStore } from "../store/store";
import ResumeTop from './ResumeTop';
import ResumeMainContent from './ResumeMainContent';
import ResumeEdit from './ResumeEdit';
import { useState } from "react";

const Resume = ( {setIsResumeOpen}) => {
    const { currentUser } = useAuthStore();
    const params = useParams()
    const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="bg-gray-300 bg-opacity-80 p-4 h-full">
        <div>
        <button onClick={() => setIsResumeOpen(false)} className="text-white h-10 lg:h-auto py-2 px-4 uppercase rounded bg-red-500 hover:bg-red-600 shadow hover:shadow-lg font-extralight lg:font-medium transition transform hover:-translate-y-0.5 mb-2">X</button>
        {currentUser === params.userId ? <button className="text-white h-10 lg:h-auto py-2 px-4 uppercase rounded bg-blue-500 hover:bg-blue-600 shadow hover:shadow-lg font-extralight lg:font-medium transition transform hover:-translate-y-0.5 mb-2 ml-2" onClick={() => setIsEditOpen(true)}>Edit</button> : null}
        
        </div>
        
        {isEditOpen ? <ResumeEdit setIsEditOpen={setIsEditOpen} setIsResumeOpen={setIsResumeOpen}/> 
        :   <div className="bg-white border-1 shadow-lg shadow-gray-700 rounded-lg h-fit flex flex-col">
                <ResumeTop className="flex-shrink-0" />
                <ResumeMainContent className="flex-grow" />
            </div>}
      
    </div>
  );
}

export default Resume;
