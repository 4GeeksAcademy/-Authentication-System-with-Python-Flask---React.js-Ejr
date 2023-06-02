import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
  const { companyID } = useParams();
  const [newWorker, setNewWorker] = useState(initialState);
  const responseToast = (msg) => toast(msg);
  const handleChange = ({ target }) => {
    setNewWorker({ ...newWorker, [target.name]: target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await createWorker(companyID, newWorker);
    setNewWorker(initialState);
    responseToast(data.msg);
  };

  return (
    <>
      <Header />
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
