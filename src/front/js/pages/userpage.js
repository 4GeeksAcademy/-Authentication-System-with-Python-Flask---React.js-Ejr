import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const UserPage = () => {
  const { store } = useContext(Context);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}api/private`, {
          headers: {
            Authorization: `Bearer ${store.token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        console.log("User Data:", data); // For debugging (optional)
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [store.token]);

  // Show loading message while fetching user data
  if (loading) {
    return <p>Loading user data...</p>;
  }

  // If user data is available, display it
  if (user) {
    return (
      <div>
        <h2>Welcome, {user.first_name}</h2>
        <p>Email: {user.email}</p>
        <p>Phone Number: {user.phone_number}</p>
        {/* Render other user data here */}
      </div>
    );
  }

  // If user data is not available, show an error message
  return <p>Error fetching user data</p>;
};

export default UserPage;
