import React from 'react';
import { useAuthStore } from '../store/store';

const ProfileDescription = () => {
  const {user} = useAuthStore()

  return (
    <div className="mt-12 flex flex-col justify-center">
      <p className="text-gray-600 text-center font-light">
        {user?.description}
      </p>
    </div>
  );
};

export default ProfileDescription;
