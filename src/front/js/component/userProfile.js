// src/components/UserProfile.js

import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <p>Please log in to see your profile.</p>;
  }

  return (
    <div>
      <h1>{currentUser.name}</h1>
      <p>Email: {currentUser.email}</p>
    </div>
  );
};

export default UserProfile;
