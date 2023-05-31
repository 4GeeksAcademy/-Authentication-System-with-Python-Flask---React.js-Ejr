import React, { useState } from "react";
import Navbar from "../../components/navbar/index.jsx";
import { createService } from "../../service/services.js";
import { useNavigate, useParams } from "react-router-dom";
import ServiceForm from "../../components/serviceForm/index.jsx";

const initialState = {
  name: "",
  description: "",
  service_duration: "",
  price: "",
};

export const CreateService = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [newService, setNewService] = useState(initialState);

  const handleChange = ({ target }) => {
    setNewService({ ...newService, [target.name]: target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createService(params.companyID, newService);
    navigate(`/service-list/${params.companyID}`);
    setNewService(initialState);
  };

  return (
    <>
      <Navbar />
      <ServiceForm
        newService={newService}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        textBtn="Create"
      />
    </>
  );
};
