import React from "react";
import styles from "./serviceCard.module.css";

export const ServiceCard = ({ services, handleDelete }) => {
  return (
    <>
      {services.map((service) => {
        return !service.is_active ? null : (
          <div className={`${styles._listService}`} key={service.id}>
            <p className={styles._textService}>{service.name}</p>

            <button className={`${styles._btnListService} me-4 `}>Edit</button>
            <button
              className={styles._btnListService}
              onClick={() => handleDelete(service.id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};
