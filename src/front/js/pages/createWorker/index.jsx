import React, { useState } from "react";

import Navbar from "../../components/navbar/index.jsx";

import WorkerForm from "../../components/workerForm/index.jsx";
import { createWorker } from "../../service/workers.js";
import { useParams } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);
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
      <Navbar />
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
