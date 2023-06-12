import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { getUserProfile } from "../../service/user";
<<<<<<< HEAD
import { useNavigate, useParams } from "react-router-dom";
=======
import { useNavigate, useParams, Link } from "react-router-dom";
>>>>>>> fd04c9ca3a6f060bac21069fd9bcb8742e5cb777

import styles from "./adminDashboard.module.css";

import Header from "../../components/header/index.jsx";
import SubHeader from "../../components/subHeader/index.jsx";
import AdminCalendar from "../../components/adminCalendar/index.jsx";

const AdminDashboard = () => {
  const { store, actions } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  const { companyId } = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    const user = await getUserProfile();
    actions.saveUserProfileData(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

<<<<<<< HEAD
  const createNewService = () => {
    navigate(`/create-service/${companyId}`);
  };
  const createNewWorker = () => {
    navigate(`/create-worker/${companyId}`);
  };
  const createServiceWorker = () => {
    navigate(`/assign-services/${companyId}`);
  };

=======
>>>>>>> fd04c9ca3a6f060bac21069fd9bcb8742e5cb777
  return (
    <>
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
        settingsTitle="Admin Settings"
        settings={
<<<<<<< HEAD
          <div className={styles._adminSettings}>
            <Button onClick={createNewService} title="Create Service" />
            <Button onClick={createNewWorker} title="Create Worker" />
            <Button onClick={createServiceWorker} title="Assign Service" />
          </div>
=======
          <ul className={styles._settingsContainer}>
            <li>
              <Link to={`/create-service/${companyId}`}>
                Create new service
              </Link>
            </li>
            <li>
              <Link to={`/create-worker/${companyId}`}>Create new worker</Link>
            </li>
            <li>
              <Link to={`/assign-services/${companyId}`}>Assign services</Link>
            </li>
          </ul>
>>>>>>> fd04c9ca3a6f060bac21069fd9bcb8742e5cb777
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
