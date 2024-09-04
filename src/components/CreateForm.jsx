import React, { useState } from 'react'
import CreateInputField from './CreateInputField';
import FormGroup from './FormGroup';
import { useLocation } from 'react-router-dom';
import { useUserStore } from '../store/store';

function CreateForm() {
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const { createAccount, message, setMessage, success, setSuccess } = useUserStore()
    const [isLoading, setIsLoading] = useState(false);
    const [isMatch, setIsMatch] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if(data.repeat_password === data.floating_password){   
            await createAccount(data, lastSegment);   
            setIsLoading(false);
        }else{
            setIsMatch("Passwords do not match");
        }

        setTimeout(() => {
            setIsMatch("");
            setMessage(null);
            setSuccess(null);
          }, 5000);
        setIsLoading(false);
    }

  return (
    <div className="h-full relative p-8 ml-64 w-full">
        <form className="max-w-md mx-auto flex flex-col" method='POST' onSubmit={handleSubmit}>
            <CreateInputField
            type="email"
            name="floating_email"
            id="floating_email"
            label="Email address"
            />
            <CreateInputField
            type="password"
            name="floating_password"
            id="floating_password"
            label="Password (at least 8 characters)"
            minLength={8}
            />
            <CreateInputField
            minLength={8}
            type="password"
            name="repeat_password"
            id="floating_repeat_password"
            label="Confirm password"
            />
            {lastSegment === "user" ?
            <FormGroup>
                <CreateInputField
                    type="text"
                    name="floating_first_name"
                    id="floating_first_name"
                    label="First name"
                />
                <CreateInputField
                    type="text"
                    name="floating_last_name"
                    id="floating_last_name"
                    label="Last name"
                />
            </FormGroup> : 
            <CreateInputField
            type="text"
            name="floating_company_name"
            id="floating_company_name"
            label="Company Name"
            />
            }
            
            <button
            type="submit"
            disabled={isLoading}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
            Submit
        </button>
        </form>
        <div
          className={
            isMatch || message
              ? `my-3 h-fit w-full animate-pulse rounded ${success ? "bg-green-500" : "bg-red-500"} p-1 text-center`
              : "hidden"
          }
        >
          <p>{isMatch || message}</p>
        </div>
    </div>
  )
}

export default CreateForm