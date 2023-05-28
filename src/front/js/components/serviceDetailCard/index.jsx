import React from "react";
import styles from "./serviceDetailCard.module.css";
import { useNavigate } from "react-router-dom";
import Logotipo from "../logotipo/index.jsx";
import BigContainer from "../bigContainer/index.jsx";
export const ServiceDetailCard = ({ list }) => {
  const navigate = useNavigate();

  return (
    <div className={styles._mainContainer}>
      <Logotipo className={styles._logo} />
      <BigContainer>
        <h1>Service</h1>
        <article className={styles._contentContainer}>
          <div className={styles._servicesContainer}>
            <div className={`${styles._smallContainer} _boxShadow`}>
              <p>Company: {list.company_id}</p>
              <p>Create: {list.created_at}</p>
              <p>Description: {list.description}</p>
              <p>Name: {list.name}</p>
              <p>Price: {list.price}</p>
              <p>Service duration: {list.service_duration}</p>
            </div>
          </div>
        </article>
        <button
          type="submit"
          className={`${styles._loginBtn} boxShadow`}
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </BigContainer>
    </div>
  );
};
