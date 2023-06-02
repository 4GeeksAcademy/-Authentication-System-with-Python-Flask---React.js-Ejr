import React, { useEffect, useState } from "react";
import { getInfoCompanyByUserId } from "../../service/company";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./adminDashboard.module.css";
import Header from "../../components/header/index.jsx";
import SubHeader from "../../components/subHeader/index.jsx";
import { CurrentYearStats, sinceYearStart } from "../../utils/calculateDate.js";
import Button from "../../components/button/index.jsx";
import AdminCalendar from "../../components/adminCalendar/index.jsx";

const AdminDashboard = () => {
  const [user, setUser] = useState([]);

  const { companyId } = useParams();
  const navigate = useNavigate();

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

  console.log("CurrentYearStats -->", CurrentYearStats());
  console.log("sinceYearStart -->", sinceYearStart());

  return (
    <>
      <Header
        settingsTitle="Admin Settings"
        settings={
          <div className={styles._adminSettings}>
            <Button onClick={handleSubmit} title="CreateService" />
            <Button onClick={handleWorker} title="CreateWorker" />
          </div>
        }
      />
      <SubHeader />
      <main className={styles._mainContainer}>
        <div className={styles._contentContainer}>
          <AdminCalendar companyId={companyId} />
        </div>
      </main>
    </>
  );
};
export default AdminDashboard;
