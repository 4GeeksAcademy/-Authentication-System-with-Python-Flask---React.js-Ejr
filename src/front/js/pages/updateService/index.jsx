import React, { useState } from "react";
import Navbar from "../../components/navbar/index.jsx";
import UpdateServiceList from "../../components/updateServiceCard/index.jsx";
import { updateService } from "../../service/services.js";
import { useParams } from "react-router-dom";

const initialState = {
  name: "",
  description: "",
  service_duration: "",
  price: "",
};

export const UpdateService = () => {
  const { serviceID } = useParams();
  const [list, setList] = useState(initialState);

  const [isUpdated, setIsUpdated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const service = await updateService(serviceID, list);
    setList(service);
    setList(initialState);
    setIsUpdated(true);
  };

  const handleChange = ({ target }) => {
    setList({ ...list, [target.name]: target.value });
  };

  return (
    <>
      <Navbar />

      <UpdateServiceList
        list={list}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isUpdated={isUpdated}
      />
    </>
  );
};
