import React, { useEffect, useState } from "react";
import { getInfoCompanyByUserId } from "../../service/company";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUserAdmin = async () => {
      const userAdminData = await getInfoCompanyByUserId();
      setUser(userAdminData);
    };
    fetchUserAdmin();
  }, []);

  const handleSubmit = () => {
    navigate(`/create-service/${user.id}`);
  };
  const handleWorker = () => {
    navigate(`/create-worker/${user.id}`);
  };

  return (
    <>
      <h1>Admin Dashboard</h1>
      <button onClick={handleSubmit}>CreateService</button>
      <button onClick={handleWorker}>CreateWorker</button>
    </>
  );
};
export default AdminDashboard;
