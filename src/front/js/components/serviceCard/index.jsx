import React from "react";
import styles from "./serviceCard.module.css";
import { useNavigate } from "react-router-dom";

export const ServiceCard = ({ services, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <>
      {services.map((service) => {
        return !service.is_active ? null : (
          <div className={`${styles._listService}`} key={service.id}>
            <p
              className={styles._textService}
              onClick={() => navigate(`/service-detail/${service.id}`)}
            >
              {service.name}
            </p>

            <button
              className={`${styles._btnListService} me-4 `}
              onClick={() => navigate(`/update-service/${service.id}`)}
            >
              Edit
            </button>
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
