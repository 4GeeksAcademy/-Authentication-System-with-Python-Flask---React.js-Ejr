import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createService } from "../../service/services.js";
import styles from "./serviceForm.module.css";
import Button from "../button/index.jsx";
import Input from "../input/index.jsx";
import BigContainer from "../../components/bigContainer/index.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { serviceSchema } from "../../validations/serviceValidation.js";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  description: "",
  service_duration: "",
  price: "",
};

const ServiceForm = ({ textBtn }) => {
  const [newService, setNewService] = useState(initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(serviceSchema),
  });

  const { companyID } = useParams();
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setNewService({ ...newService, [target.name]: target.value });
  };

  const onSubmit = async () => {
    const resMsg = await createService(companyID, newService);
    if (resMsg?.error) {
      toast.error(resMsg?.msg);
    } else {
      toast.success(resMsg?.msg);
      navigate(`/service-list/${companyID}`);
    }
  };

  return (
    <main className={styles._mainContainer}>
      <BigContainer>
        <h1>Create Service</h1>
        <form
          className={styles._form}
          onChange={handleChange}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            icon={<i className="fa-solid fa-circle-user"></i>}
            type="text"
            placeholder="Name"
            name="name"
            value={newService.name}
            register={register}
          />
          {errors?.name && (
            <small className={styles._fail}>
              <i className="fa-solid fa-circle-exclamation"></i>{" "}
              {errors.name?.message}
            </small>
          )}
          <Input
            icon={<i className="fa-solid fa-pen-to-square"></i>}
            type="text"
            placeholder="Description"
            name="description"
            value={newService.description}
            register={register}
          />
          {errors?.description && (
            <small className={styles._fail}>
              <i className="fa-solid fa-circle-exclamation"></i>{" "}
              {errors.description?.message}
            </small>
          )}
          <Input
            icon={<i className="fa-regular fa-clock"></i>}
            type="text"
            placeholder="Service duration"
            name="service_duration"
            value={newService.service_duration}
            register={register}
          />
          {errors?.service_duration && (
            <small className={styles._fail}>
              <i className="fa-solid fa-circle-exclamation"></i>{" "}
              {errors.service_duration?.message}
            </small>
          )}
          <Input
            icon={<i className="fa-solid fa-coins"></i>}
            type="text"
            placeholder="Price"
            name="price"
            value={newService.price}
            register={register}
          />
          {errors?.price && (
            <small className={styles._fail}>
              <i className="fa-solid fa-circle-exclamation"></i>{" "}
              {errors.price?.message}
            </small>
          )}
          <Button type="submit" title={textBtn} />
        </form>
      </BigContainer>
    </main>
  );
};
export default ServiceForm;
