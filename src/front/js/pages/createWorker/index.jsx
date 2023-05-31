import React, { useState } from "react";

import Navbar from "../../components/navbar/index.jsx";

import WorkerForm from "../../components/workerForm/index.jsx";
import { createWorker } from "../../service/workers.js";
import { useParams } from "react-router-dom";

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

  const handleChange = ({ target }) => {
    setNewWorker({ ...newWorker, [target.name]: target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createWorker(companyID, newWorker);
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
