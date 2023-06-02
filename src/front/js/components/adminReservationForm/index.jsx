import React from "react";
import styles from "./adminReservationForm.module.css";
import Input from "../input/index.jsx";
import Button from "../button/index.jsx";

const AdminReservationForm = ({
  handleChange,
  handleSubmit,
  workersList,
  servicesList,
  handleServiceSelect,
  handleWorkerSelect,
  textBtn,
}) => {
  return (
    <main className={styles._mainContainerImg}>
      <div className={styles._parentTwo}>
        <div className={styles._childTwo}>
          <h2 className={styles._titleService}>Create Booking</h2>
          <form
            className={styles._form}
            onChange={handleChange}
            onSubmit={handleSubmit}
          >
            <div className={styles._selectContainer}>
              <select
                name="service"
                className={`${styles._select} _boxShadow`}
                onChange={(e) => handleServiceSelect(e)}
              >
                {servicesList?.map((op) => (
                  <option key={op.id}>{op && op.name}</option>
                ))}
              </select>
              <select
                name="worker"
                className={`${styles._select} _boxShadow`}
                onChange={(e) => handleWorkerSelect(e)}
              >
                {workersList?.map((op) => (
                  <option key={op.id}>{op.user && op.user.username}</option>
                ))}
              </select>
              <Input
                icon={<i className="fa-solid fa-clock"></i>}
                type="text"
                placeholder="Start Service"
                name="start_service"
              />
              <Input
                icon={<i className="fa-solid fa-pen-to-square"></i>}
                type="text"
                placeholder="Description"
                name="description"
              />
              <Button type="submit" title={textBtn} />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminReservationForm;
