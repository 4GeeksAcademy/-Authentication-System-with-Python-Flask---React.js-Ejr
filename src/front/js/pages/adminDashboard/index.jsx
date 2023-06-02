import React, { useEffect, useState } from "react";
import { getInfoCompanyByUserId } from "../../service/company";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./adminDashboard.module.css";
import Header from "../../components/header/index.jsx";
import SubHeader from "../../components/subHeader/index.jsx";
import Button from "../../components/button/index.jsx";
import AdminCalendar from "../../components/adminCalendar/index.jsx";

const AdminDashboard = () => {
  const [user, setUser] = useState([]);

  const { companyId } = useParams();
  const navigate = useNavigate();

  const fetchUserAdmin = async () => {
    const userAdminData = await getInfoCompanyByUserId();
    setUser(userAdminData);
  };

  useEffect(() => {
    fetchUserAdmin();
  }, []);

  const createNewService = () => {
    navigate(`/create-service/${user.id}`);
  };
  const createNewWorker = () => {
    navigate(`/create-worker/${user.id}`);
  };

  return (
    <>
      <Header
        updateProfile={() => navigate(`/profile/${user.id}`)}
        settingsTitle="Admin Settings"
        settings={
          <div className={styles._adminSettings}>
            <Button onClick={createNewService} title="CreateService" />
            <Button onClick={createNewWorker} title="CreateWorker" />
          </div>
        }
      />
      <SubHeader
        navigate={() => navigate(`/admin-create-booking/${companyId}`)}
      />
      <main className={styles._mainContainer}>
        <div className={styles._contentContainer}>
          <AdminCalendar companyId={companyId} />
        </div>
      </main>
    </>
  );
};
export default AdminDashboard;
