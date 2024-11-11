import React, { useEffect, useState } from 'react';
import Header from './Header';
import ProfileCard from '../components/ProfileCard';
import { useUserStore } from '../store/store';

const StudentListing = () => {
  const { fetchUsersPublic } = useUserStore();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchUsersPublic();
        if (Array.isArray(fetchedUsers)) {
          setUsers(fetchedUsers.filter(user => user.role === "STUDENT"));
        } else {
          console.error("Fetched data is not an array:", fetchedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    
    getUsers();
  }, [fetchUsersPublic]);

  return (
    <>
        <Header/>
        <div className="flex flex-wrap justify-center gap-2 my-2">
        {users.map((user) => (
            <ProfileCard key={user.id} user={user} />
        ))}
        </div>
    </>
    
  );
};

export default StudentListing;