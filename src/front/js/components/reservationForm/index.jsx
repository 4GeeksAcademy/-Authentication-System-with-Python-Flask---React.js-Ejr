import React from "react";
import styles from "./reservationForm.module.css";
import Input from "../input/index.jsx";

const ReservationForm = ({
  handleChange,
  handleSubmit,
  workersList,
  servicesList,
  handleServiceSelect,
  handleWorkerSelect,
}) => {
  return (
    <form onChange={handleChange} onSubmit={handleSubmit}>
      <div className={styles._selectContainer}>
        <select
          name="service"
          className="boxShadow"
          onChange={(e) => handleServiceSelect(e)}
        >
          {servicesList?.map((op) => (
            <option key={op.id}>{op && op.name}</option>
          ))}
        </select>
        <select
          name="worker"
          className="boxShadow"
          onChange={(e) => handleWorkerSelect(e)}
        >
          {workersList?.map((op) => (
            <option key={op.id}>{op.user && op.user.username}</option>
          ))}
        </select>
        <Input
          icon={<i className="fa-solid fa-circle-user"></i>}
          type="text"
          placeholder="Start Service"
          name="start_service"
        />
        <Input
          icon={<i className="fa-solid fa-circle-user"></i>}
          type="text"
          placeholder="Description"
          name="description"
        />
        <button type="submit" className={styles._loginBtn}>
          Create
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
