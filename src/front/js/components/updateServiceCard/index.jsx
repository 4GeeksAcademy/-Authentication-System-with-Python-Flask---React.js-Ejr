import React, { useState } from "react";
import styles from "./updateServiceCard.module.css";
import Input from "../input/index.jsx";
import { useNavigate, useParams } from "react-router-dom";
import BigContainer from "../../components/bigContainer/index.jsx";
import Button from "../button/index.jsx";
import { updateService } from "../../service/services.js";
import { serviceSchema } from "../../validations/serviceValidation.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  description: "",
  service_duration: "",
  price: "",
};

const UpdateServiceList = ({ textBtn, textBackBtn }) => {
  const navigate = useNavigate();

  const { serviceID } = useParams();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(serviceSchema),
  });

  const [service, setService] = useState(initialState);

  const handleChange = ({ target }) => {
    setService({ ...service, [target.name]: target.value });
  };

  const onSubmit = async (e) => {
    const resMsg = await updateService(serviceID, service);
    if (resMsg?.error) {
      toast.error(resMsg?.msg);
    } else {
      toast.success(resMsg?.msg);
      navigate(`/service-list/${resMsg.data.company_id}`);
    }
  };

  return (
    <main className={styles._mainContainer}>
      <BigContainer>
        <h1>Update Service</h1>
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
            value={service.name}
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
            value={service.description}
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
            value={service.service_duration}
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
            value={service.price}
            register={register}
          />
          {errors?.price && (
            <small className={styles._fail}>
              <i className="fa-solid fa-circle-exclamation"></i>{" "}
              {errors.price?.message}
            </small>
          )}
          <Button
            type="submit"
            title={textBackBtn}
            onClick={() => navigate(-1)}
          />
          <Button type="submit" title={textBtn} />
        </form>
      </BigContainer>
    </main>
  );
};

export default UpdateServiceList;
