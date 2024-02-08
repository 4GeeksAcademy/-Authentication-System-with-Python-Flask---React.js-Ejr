import React, { useState, useEffect } from 'react';

export const UserLevelConnectLink= () => {
  const [role, setRole] = useState(null); // State to store the user role
  const [error, setError] = useState(null); // State to handle any errors

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        const response = await fetch(`${process.env.BACKEND_URL}/api/userslevel`, {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const userLevel = data.level;
        let roleName;

        switch (userLevel) {
          case  1:
            roleName = "Basic User";
            break;
          case  2:
            roleName = "Super User";
            break;
          case  3:
            roleName = "Admin";
            break;
          default:
            roleName = "Unknown Role";
        }

        setRole(roleName); 
      } catch (err) {
        setError(err.message); 
      }
    };

    fetchUserRole(); 
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <p>Your role is: {role}</p>;
};