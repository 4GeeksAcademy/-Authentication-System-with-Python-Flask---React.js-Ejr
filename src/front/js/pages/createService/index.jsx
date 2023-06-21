import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import Spinner from "../../components/spinner/index.jsx";
import Header from "../../components/header/index.jsx";
import ServiceForm from "../../components/serviceForm/index.jsx";

const CreateService = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { store } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  return (
    <main>
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
      />
      {!isLoading ? <ServiceForm textBtn="Create" /> : <Spinner />}
    </main>
  );
};

export default CreateService;
