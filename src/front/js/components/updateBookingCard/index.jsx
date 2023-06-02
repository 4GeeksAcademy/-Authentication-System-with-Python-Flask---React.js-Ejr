import React from "react";
import styles from "./updateBookingCard.module.css";
import Input from "../input/index.jsx";
import Button from "../button/index.jsx";
import { useNavigate } from "react-router-dom";

const UpdateBookingList = ({
  formData,
  handleSubmit,
  handleChange,
  textBtn,
  workerList,
  serviceList,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <main className={styles._mainContainerImg}>
        <div className={styles._parentTwo}>
          <div className={styles._childTwo}>
            <h2 className={styles._titleService}>Update service</h2>
            <form
              className={styles._form}
              onSubmit={handleSubmit}
              onChange={handleChange}
            >
              <div className={styles._inputContainer}>
                <i className="fa-solid fa-circle-user"></i>
                <select
                  className="_boxShadow"
                  value={formData.worker}
                  name="worker"
                >
                  <option>Select Worker ID</option>
                  {workerList.map((workerId) => (
                    <option key={workerId.id} value={workerId.id}>
                      {workerId.user.firstname}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles._inputContainer}>
                <i className="fa-solid fa-circle-user"></i>
                <select
                  className="_boxShadow"
                  value={formData.service}
                  name="service"
                >
                  <option>Select Service ID </option>
                  {serviceList.map((serviceId) => (
                    <option key={serviceId.id} value={serviceId.id}>
                      {serviceId.name}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                icon={<i className="fa-regular fa-clock"></i>}
                type="text"
                placeholder="Booking Time"
                name="start_service"
                value={formData.start_service}
              />
              <Input
                icon={<i className="fa-solid fa-pen-to-square"></i>}
                type="text"
                placeholder="description"
                name="description"
                value={formData.description}
              />
              <Button type="submit" title={textBtn} />
              <button
                className={`${styles._loginBtnGoBack} boxShadow`}
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default UpdateBookingList;
