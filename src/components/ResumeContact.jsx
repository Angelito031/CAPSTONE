import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { useAuthStore } from "../store/store"

const ResumeContact = () => {
  const {user} = useAuthStore()
  const resume = user?.resume

  return (
    <div className="py-3">
      <h2 className="text-lg font-poppins font-bold text-gray-700">My Contact</h2>
      <div className="border-2 w-20 border-gray-700 my-3"></div>
      <div>
        <div className="flex items-center my-1">
          <FaPhoneAlt className="text-gray-700 hover:text-orange-600 w-6 h-6" />
          <div className="ml-2">{resume?.contactno}</div>
        </div>
        <div className="flex items-center my-1">
          <FaEnvelope className="text-gray-700 hover:text-orange-600 w-6 h-6" />
          <div className="ml-2">{resume?.email}</div>
        </div>
        <div className="flex items-center my-1">
          <FaFacebookF className="text-gray-700 hover:text-orange-600 w-6 h-6" />
          <div className="ml-2">{resume?.facebook}</div>
        </div>
        <div className="flex items-center my-1">
          <FaTwitter className="text-gray-700 hover:text-orange-600 w-6 h-6" />
          <div className="ml-2">{resume?.twitter}</div>
        </div>
      </div>
    </div>
  );
}

export default ResumeContact;
