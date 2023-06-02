import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createWorker } from "../../service/workers.js";

import Header from "../../components/header/index.jsx";
import WorkerForm from "../../components/workerForm/index.jsx";

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
      <Header />
      <WorkerForm
        newWorker={newWorker}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </>
  );
};
export default CreateWorker;
