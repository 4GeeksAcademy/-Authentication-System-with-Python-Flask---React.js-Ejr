import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

const UserPage = () => {
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState(null); // User data from API response, initially set to null
  const [loading, setLoading] = useState(true); // Loading state for the API request

  useEffect(() => {
    // Fetch user data from the API when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await fetch("API_ENDPOINT_FOR_USER_DATA"); // Replace with your actual API endpoint for user data
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="user-page-container">
      <h2>Welcome, {loading ? "Loading..." : user?.name}</h2>
      {loading ? (
        <p>Loading user information...</p>
      ) : (
        <>
          <p>Email: {user?.email}</p>
          <p>Favorite Car: {loading ? "Loading..." : "Placeholder for favorite car"}</p>
          {/* Placeholder for Favorite Car details */}
          {/* Replace "Placeholder for favorite car" with actual data from API */}
          <p>Compare Cars: {loading ? "Loading..." : "Placeholder for compare cars"}</p>
          {/* Placeholder for Compare Cars feature */}
          {/* Replace "Placeholder for compare cars" with actual data from API */}
        </>
      )}
    </div>
  );
};

export default UserPage;
