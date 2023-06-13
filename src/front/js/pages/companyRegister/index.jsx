import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

import styles from "./companyRegister.module.css";
import { bgImg } from "../../../../assets/assets.jsx";
import Spinner from "../../components/spinner/index.jsx";
import Logotipo from "../../components/logotipo/index.jsx";
import CompanyForm from "../../components/companyForm/index.jsx";

const initialState = {
  cif: "",
  name: "",
  description: "",
  address: "",
  workingSchedule: "",
};

const CompanyRegister = () => {


  const [newCompany, setNewCompany] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setNewCompany({ ...newCompany, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    actions.saveCompanyData(newCompany);
    console.log(newCompany);
    navigate("/company-register-2");
  };

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
              handleChange={handleChange}
              handleSubmit={handleSubmit}
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
