import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { createService } from "../../service/services.js";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/spinner/index.jsx";
import Header from "../../components/header/index.jsx";
import ServiceForm from "../../components/serviceForm/index.jsx";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  description: "",
  service_duration: "",
  price: "",
};

const CreateService = () => {
  const [newService, setNewService] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const { store } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  const params = useParams();
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setNewService({ ...newService, [target.name]: target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const resMsg = await createService(params.companyID, newService);
    if (resMsg.data) {
      toast.success(resMsg?.msg);
      navigate(`/service-list/${params.companyID}`);
    } else {
      toast.error(resMsg?.msg);
    }
  };

  return (
    <>
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
      />
      {!isLoading ? (
        <ServiceForm
          newService={newService}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          textBtn="Create"
        />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CreateService;
