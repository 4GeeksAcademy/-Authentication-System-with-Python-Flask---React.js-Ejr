import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import "./styles.css";
import UserForm from "../../components/userForm/index.jsx";
import Header from "../../components/header/index.jsx";
import { registerCompany } from "../../service/user";
=======
import { createCompany } from "../../service/company.js";

import styles from "./companyRegister2.module.css";
import bgImg from "../../../../assets/bgImg.jpeg";

import Logotipo from "../../components/logotipo/index.jsx";
import UserForm from "../../components/userForm/index.jsx";
>>>>>>> dev

const CompanyRegister2 = () => {
  const { store } = useContext(Context);
  const [newCompany, setNewCompany] = useState(store.companyData.data);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setNewCompany({ ...newCompany, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    const data = await registerCompany(newCompany);
=======
    await createCompany(newCompany);
>>>>>>> dev
    navigate("/admin-dashboard");
  };

  return (
<<<<<<< HEAD
    <main className="mainContainer">
      <Header />
      <section>
        <h2 className="title">Now your data...</h2>
        <UserForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          textBtn="Complete your Register"
        />
        <div className="bgImg"></div>
      </section>
    </main>
=======
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
          <UserForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            textBtn="Finish Register"
          />
          <span className={styles._credits}>
            Photo by Andrew Neel on Unsplash
          </span>
          <span className={`${styles._line} _gradient1`}></span>
        </div>
      </section>
    </main>
    // <main className="mainContainer">
    //   <Header />
    //   <section>
    //     <h2 className="title">Now your data...</h2>
    //     <UserForm
    //       handleChange={handleChange}
    //       handleSubmit={handleSubmit}
    //       textBtn="Complete your Register"
    //     />
    //     <div className="bgImg"></div>
    //   </section>
    // </main>
>>>>>>> dev
  );
};
export default CompanyRegister2;
