import React, { useState } from 'react';
import CreateInputField from './CreateInputField';
import FormGroup from './FormGroup';
import { useLocation } from 'react-router-dom';
import { useUserStore } from '../store/store';
import { bouncy } from 'ldrs';

function CreateForm() {
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const { createAccount, message, setMessage, success, setSuccess } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isMatch, setIsMatch] = useState();
    const [formData, setFormData] = useState({
        floating_email: '',
        floating_password: '',
        repeat_password: '',
        floating_first_name: '',
        floating_last_name: '',
        floating_company_name: ''
    });

    bouncy.register();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (formData.repeat_password === formData.floating_password) {
            await createAccount(formData, lastSegment);
            setIsLoading(false);
        } else {
            setIsMatch("Passwords do not match");
        }

        setTimeout(() => {
            setIsMatch("");
            setMessage(null);
            setSuccess(null);
            setFormData({
                floating_email: '',
                floating_password: '',
                repeat_password: '',
                floating_first_name: '',
                floating_last_name: '',
                floating_company_name: ''
            });
        }, 1500);
        
        setIsLoading(false);
    };

    return (
        <div className="h-full relative p-8 ml-64 w-full flex flex-col justify-center items-center">
            <form className="w-1/2 mx-auto flex flex-col shadow-md p-3 shadow-gray-400" method='POST' onSubmit={handleSubmit}>
                <CreateInputField
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    label="Email address"
                    value={formData.floating_email}
                    onChange={handleChange}
                />
                <CreateInputField
                    type="password"
                    name="floating_password"
                    id="floating_password"
                    label="Password (at least 8 characters)"
                    minLength={8}
                    value={formData.floating_password}
                    onChange={handleChange}
                />
                <CreateInputField
                    minLength={8}
                    type="password"
                    name="repeat_password"
                    id="floating_repeat_password"
                    label="Confirm password"
                    value={formData.repeat_password}
                    onChange={handleChange}
                />
                {lastSegment === "user" ? (
                    <FormGroup>
                        <CreateInputField
                            type="text"
                            name="floating_first_name"
                            id="floating_first_name"
                            label="First name"
                            value={formData.floating_first_name}
                            onChange={handleChange}
                        />
                        <CreateInputField
                            type="text"
                            name="floating_last_name"
                            id="floating_last_name"
                            label="Last name"
                            value={formData.floating_last_name}
                            onChange={handleChange}
                        />
                    </FormGroup>
                ) : lastSegment === "company" ? (
                    <CreateInputField
                        type="text"
                        name="floating_company_name"
                        id="floating_company_name"
                        label="Company Name"
                        value={formData.floating_company_name}
                        onChange={handleChange}
                    />
                ) : null}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`text-white bg-blue-700 ${isLoading ? "" : "hover:bg-blue-800"} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
                >
                    {isLoading ? <l-bouncy color="white" size="25" speed="1" /> : "Submit"}
                </button>
            </form>
            <div
                className={
                    isMatch || message
                        ? `my-3 h-fit w-1/2 text-wrap animate-pulse rounded ${success ? "bg-green-500" : "bg-red-500"} p-1 text-center`
                        : "hidden"
                }
            >
                <p>{isMatch || message || "an error occured"}</p>
            </div>
        </div>
    );
}

export default CreateForm;
