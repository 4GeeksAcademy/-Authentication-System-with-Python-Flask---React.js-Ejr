import React, { useState } from "react";
import styles from "./createClient.module.css";
import BigContainer from "../../components/bigContainer/index.jsx";
import ClientForm from "../../components/clientForm/index.jsx";

const initialState = {
  name: "",
  lastname: "",
  email: "",
  phone: "",
};

const createClient = () => {
  const [newClient, setNewClient] = useState(initialState);

  const handleChange = ({ target }) => {
    setNewClient({ ...newClient, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles._mainContainer}>
      <BigContainer>
        <h1>Create Client</h1>
        <ClientForm handleChange={handleChange} handleSubmit={handleSubmit} />
      </BigContainer>
    </div>
  );
};

export default createClient;
