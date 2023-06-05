import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import { createWorker } from "../../service/workers.js";

import Header from "../../components/header/index.jsx";
import WorkerForm from "../../components/workerForm/index.jsx";
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

  const { store } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  const navigate = useNavigate();
  const { companyID } = useParams();

  const responseToast = (msg) => toast(msg);

  const handleChange = ({ target }) => {
    setNewWorker({ ...newWorker, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await createWorker(companyID, newWorker);
    setNewWorker(initialState);
    responseToast(data.msg);
    navigate(`/admin-dashboard/${companyID}`);
  };

  return (
    <>
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
      />
      <WorkerForm
        newWorker={newWorker}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        textBtn="Create"
      />
    </>
  );
};
export default CreateWorker;
