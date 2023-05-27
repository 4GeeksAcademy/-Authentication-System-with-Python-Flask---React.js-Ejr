import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import UserForm from "../../components/userForm/index.jsx";
import Header from "../../components/header/index.jsx";
import { createCompany } from "../../service/company.js";

const CompanyRegister2 = () => {
  const { store } = useContext(Context);
  const [newCompany, setNewCompany] = useState(store.companyData.data);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setNewCompany({ ...newCompany, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await createCompany(newCompany);
    navigate("/admin-dashboard");
  };

  return (
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
  );
};
export default CompanyRegister2;
