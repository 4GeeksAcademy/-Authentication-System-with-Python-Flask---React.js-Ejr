import React, { useState, useEffect } from "react";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/user`);
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
  }, []);

  return (
    <div className="user-page-container">
      <h2>User Page</h2>
      {loading ? (
        <p>Loading user data...</p>
      ) : user ? (
        <div>
          <p>Name: {user.first_name}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phone_number}</p>
          {/* Display additional user data here if needed */}
        </div>
      ) : (
        <p>Unable to fetch user data.</p>
      )}
    </div>
  );
};

export default UserPage;
