import Sidebar from '../components/Sidebar';
import Table from '../components/Table';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserStore } from '../store/store';

const AdminTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [showModal, setShowModal] = useState(false); 
    const { users, fetchUsers, message, success, setSuccess } = useUserStore();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    useEffect(() => {
        if (success) {
          setShowModal(true);
        }
      }, [success]);

    const handleContinue = () => {
        setSuccess(false);
        setShowModal(false); 
    };  

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true); 
            await fetchUsers();
            setLoading(false); 
        };

        loadUsers();
    }, [fetchUsers]);

    useEffect(() => {
        if (users && users.length > 0) {
            const filteredData = users.filter(user =>
                (user.role === 'STUDENT' && lastSegment === 'users') ||
                (user.role === 'COMPANY' && lastSegment === 'companies')
            );
            setData(filteredData);
        }
    }, [users, lastSegment]);

    return (
        <div className='flex h-screen'>
            <Sidebar />
            {loading ? (
                <div className='ml-64 flex items-center justify-center'>
                    <p className='ml-96 text-2xl font-bold'>Loading...</p>
                </div>
            ) : (
                <Table data={data} />
            )}
             {showModal && (
                <>
                <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
                <div className="bg-cyan-100 h-fit w-72 absolute top-48 left-1/2 transform -translate-x-1/2 text-black font-bold rounded-md shadow-lg z-40">
                    <p className="text-center mt-5">{message}</p>
                    <button
                    onClick={handleContinue}
                    className="text-white h-10 lg:h-auto py-2 px-4 my-2 mx-20 uppercase rounded bg-green-700 hover:bg-green-800 shadow hover:shadow-lg font-extralight lg:font-medium transition transform hover:-translate-y-0.5"
                    >
                    Continue
                    </button>
                </div>
                </>
            )}
        </div>
    );
}

export default AdminTable;
