import React, { useState } from "react";
import styles from "./companyRegister.module.css";
import { bgImg } from "../../../../assets/assets.jsx";
import Spinner from "../../components/spinner/index.jsx";
import Logotipo from "../../components/logotipo/index.jsx";
import CompanyForm from "../../components/companyForm/index.jsx";

const CompanyRegister = () => {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className={styles._mainContainer}>
      <section className={styles._sectionContainer}>
        <img
          className={styles._bgImg}
          src={bgImg}
          alt="Woman booking a service in your computer"
        />
        <div className={styles._actionContainer}>
          <Logotipo />
          <h1 className={styles._heading}>Company Register</h1>
          {!isLoading ? (
            <CompanyForm
              textBtn="Next Step"
            />
          ) : (
            <Spinner />
          )}
          <span className={styles._credits}>
            Photo by Andrew Neel on Unsplash
          </span>
          <span className={`${styles._line} _gradient1`}></span>
        </div>
      </section>
    </main>
  );
};
export default CompanyRegister;
