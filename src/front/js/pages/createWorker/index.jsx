import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import { createWorker } from "../../service/workers.js";

import Header from "../../components/header/index.jsx";
import WorkerForm from "../../components/workerForm/index.jsx";
import Spinner from "../../components/spinner/index.jsx";
import { toast } from "react-toastify";

const initialState = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  working_schedule: "",
  password: "",
};

const CreateWorker = () => {
  const [newWorker, setNewWorker] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const { store } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  const navigate = useNavigate();
  const { companyID } = useParams();

  const handleChange = ({ target }) => {
    setNewWorker({ ...newWorker, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resMsg = await createWorker(companyID, newWorker);
    if (resMsg.data) {
      toast.success(resMsg?.msg);
      navigate(`/admin-dashboard/${companyID}`);
    } else {
      toast.error(resMsg?.msg);
    }
  };

  return (
    <>
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
      />
      {!isLoading ? (
        <WorkerForm
          newWorker={newWorker}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          textBtn="Create"
        />
      ) : (
        <Spinner />
      )}
    </>
  );
};
export default CreateWorker;
