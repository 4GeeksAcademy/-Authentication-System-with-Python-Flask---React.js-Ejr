import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import Header from "../../components/header/index.jsx";
import WorkerForm from "../../components/workerForm/index.jsx";
import Spinner from "../../components/spinner/index.jsx";

const CreateWorker = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { store } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  return (
    <main>
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
      />
      {!isLoading ? <WorkerForm textBtn="Create" /> : <Spinner />}
    </main>
  );
};
export default CreateWorker;
