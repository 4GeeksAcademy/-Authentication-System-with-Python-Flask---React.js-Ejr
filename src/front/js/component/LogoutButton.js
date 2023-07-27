import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';


const LogoutButton = () => {
    const {store , actions} = useContext(Context)
    const [isLoggedIn, setIsLoggedIn]  = useState(false);
    const token = localStorage.getItem("token")


    useEffect(() => {
        if (store.isLogged == false) {
            return setIsLoggedIn(false)
        }
        else if (!isLoggedIn) {
          return null;
        }
    })

  const handleLogout = () => {
    // Perform any necessary logout actions, e.g., API call to invalidate tokens, etc.

    // Clear any stored tokens or session information
    // Example: localStorage.removeItem('authToken');

    // Set the isLoggedIn state to false to indicate the user is logged out
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return null; // Render nothing if the user is already logged out
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
