import Sidebar from '../components/Sidebar';
import Table from '../components/Table';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserStore } from '../store/store';


const AdminTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const { users, fetchUsers} = useUserStore();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    useEffect(() => {
        const loadUsers = async () => {
          setLoading(true);
          await fetchUsers(); 
          setLoading(false);
        };
      
        loadUsers(); 
      }, [fetchUsers]);

    useEffect(() => {
        // Check for the existence of `users` and update `data` whether `users` is empty or not
        if (users) {
          const filteredData = users.filter(user =>
            (user.role === 'STUDENT' && lastSegment === 'users') ||
            (user.role === 'COMPANY' && lastSegment === 'companies')
          );
          setData(filteredData);
        }
    }, [users, lastSegment]);
      
      

    return (
        <div className='flex h-screen'>
            <Sidebar/>
            {loading ? (
                <div className='ml-64 flex items-center justify-center'>
                    <p className='ml-96 text-2xl font-bold'>Loading...</p>
                </div>
            ) : (
                <Table data={data} />
            )}
        </div>
    );
}

export default AdminTable;
