import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { updateService } from "../../service/services.js";

import Header from "../../components/header/index.jsx";
import UpdateServiceList from "../../components/updateServiceCard/index.jsx";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  description: "",
  service_duration: "",
  price: "",
};

const UpdateService = () => {
  const { serviceID } = useParams();
  const [list, setList] = useState(initialState);

  const responseToast = (msg) => toast(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setList(initialState);
    const service = await updateService(serviceID, list);
    setList(service);
    responseToast(service.msg);
  };

  const handleChange = ({ target }) => {
    setList({ ...list, [target.name]: target.value });
  };

  return (
    <>
      <Header />
      <UpdateServiceList
        list={list}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        textBtn="Update"
      />
    </>
  );
};

export default UpdateService;
