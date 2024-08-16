import { useState } from 'react'
import { useAuthStore } from "../store/store";
import {FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const {forgotpassword, success, servererror, setServerError, setSuccess} = useAuthStore()

    const handleInputChange = (e) => {
        const {value} = e.target
        setEmail(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await forgotpassword(email)

        setTimeout(() => {
            setServerError(null);
            setSuccess(false)
          }, 5000);
        setIsLoading(false)
    }

    const handleGoBack = () => {
        navigate("/login")
    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
        <div className='flex justify-between'>
            <h1 className="text-center text-2xl font-bold mb-6">Forgot Password</h1>
            <button onClick={handleGoBack} className="text-white h-5 lg:h-fit p-2 rounded-md bg-gray-500 hover:bg-gray-600 shadow hover:shadow-lg font-extralight lg:font-medium transition transform hover:-translate-y-0.5"><FaArrowLeft /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                    Email Address
                </label>
                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email address" onChange={handleInputChange} value={email} required/>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
        </form>
        {servererror && <div className="bg-red-500 mt-2 text-center text-white font-bold py-2 px-4 rounded w-full">{servererror}</div>}
        {success && <div className="bg-green-500 mt-2 text-center text-white font-bold py-2 px-4 rounded w-full">Password reset link sent to your email.</div>}
    </div>
</div>
  )
}

export default ForgotPassword