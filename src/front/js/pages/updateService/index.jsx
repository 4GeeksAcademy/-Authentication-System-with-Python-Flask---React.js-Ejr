import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/index.jsx";
import UpdateServiceList from "../../components/updateServiceCard/index.jsx";

const UpdateService = () => {
  const navigate = useNavigate();

  const { store } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  return (
    <>
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
      />
      <UpdateServiceList textBtn="Update" textBackBtn="Go Back" />
    </>
  );
};

export default UpdateService;
