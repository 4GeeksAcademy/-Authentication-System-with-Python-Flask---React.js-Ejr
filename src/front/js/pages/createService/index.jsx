import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { createService } from "../../service/services.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/header/index.jsx";
import ServiceForm from "../../components/serviceForm/index.jsx";

const initialState = {
  name: "",
  description: "",
  service_duration: "",
  price: "",
};

const CreateService = () => {
  const [newService, setNewService] = useState(initialState);

  const { store } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  const params = useParams();
  const navigate = useNavigate();

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
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
      />
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
