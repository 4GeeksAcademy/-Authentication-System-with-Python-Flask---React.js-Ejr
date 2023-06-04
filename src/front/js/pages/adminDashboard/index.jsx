import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { getUserProfile } from "../../service/user";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./adminDashboard.module.css";

import Header from "../../components/header/index.jsx";
import SubHeader from "../../components/subHeader/index.jsx";
import Button from "../../components/button/index.jsx";
import AdminCalendar from "../../components/adminCalendar/index.jsx";

const AdminDashboard = () => {
  const { store, actions } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  const { companyId } = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    const user = await getUserProfile();
    console.log(user);
    actions.saveUserProfileData(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const createNewService = () => {
    navigate(`/create-service/${companyId}`);
  };
  const createNewWorker = () => {
    navigate(`/create-worker/${companyId}`);
  };
  const createServiceWorker = () => {
    navigate(`/assign-services/${companyId}`);
  };

  return (
    <>
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
        settingsTitle="Admin Settings"
        settings={
          <div className={styles._adminSettings}>
            <Button onClick={createNewService} title="Create Service" />
            <Button onClick={createNewWorker} title="Create Worker" />
            <Button onClick={createServiceWorker} title="Assign Service" />
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
