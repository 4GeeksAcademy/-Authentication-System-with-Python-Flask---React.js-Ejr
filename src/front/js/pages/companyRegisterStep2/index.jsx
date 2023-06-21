import React, { useState } from "react";

import styles from "./companyRegister2.module.css";
import { bgImg } from "../../../../assets/assets.jsx";

import Logotipo from "../../components/logotipo/index.jsx";
import UserCompanyForm from "../../components/userCompanyForm/index.jsx";
import Spinner from "../../components/spinner/index.jsx";

const CompanyRegister2 = () => {
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
          <h1 className={styles._heading}>Admin Data</h1>
          {!isLoading ? (
            <UserCompanyForm
              textBtn="Finish Register"
              textBackBtn="Previous Step"
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
export default CompanyRegister2;
