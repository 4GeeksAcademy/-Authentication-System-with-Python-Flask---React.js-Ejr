import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { createCompany } from "../../service/company.js";

import styles from "./companyRegister2.module.css";
import { bgImg } from "../../../../assets/assets.jsx";

import Logotipo from "../../components/logotipo/index.jsx";
import UserForm from "../../components/userForm/index.jsx";
import Spinner from "../../components/spinner/index.jsx";
import { toast } from "react-toastify";

const CompanyRegister2 = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { store } = useContext(Context);

  const [newCompany, setNewCompany] = useState(store.companyData.data);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setNewCompany({ ...newCompany, [target.name]: target.value });
  };
  console.log(newCompany);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resMsg = await createCompany(newCompany);
    if (resMsg) {
      toast.success(resMsg?.msg);
      navigate(`/admin-dashboard/${resMsg?.data.id}`);
    } else {
      toast.error(resMsg?.msg);
    }
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
          <h1 className={styles._heading}>Admin Data</h1>
          {!isLoading ? (
            <UserForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              textBtn="Finish Register"
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
