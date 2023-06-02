import React, { useState } from "react";
import Navbar from "../../components/navbar/index.jsx";
import { createService } from "../../service/services.js";
import { useNavigate, useParams } from "react-router-dom";
import ServiceForm from "../../components/serviceForm/index.jsx";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  description: "",
  service_duration: "",
  price: "",
};

const CreateService = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [newService, setNewService] = useState(initialState);

  const responseToast = (msg) => toast(msg);

  const handleChange = ({ target }) => {
    setNewService({ ...newService, [target.name]: target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await createService(params.companyID, newService);
    navigate(`/service-list/${params.companyID}`);
    setNewService(initialState);
    responseToast(data.msg);
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

export default CreateService;
