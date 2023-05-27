import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Header from "../../components/header/index.jsx";
import CompanyForm from "../../components/companyForm/index.jsx";

const initialState = {
  cif: "",
  name: "",
  description: "",
  address: "",
  working_schedule: "",
};

const CompanyRegister = () => {
  const navigate = useNavigate();
  const [newCompany, setNewCompany] = useState(initialState);
  const { actions } = useContext(Context);

  const handleChange = ({ target }) => {
    setNewCompany({ ...newCompany, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    actions.saveCompanyData(newCompany);
    navigate("/company-register-2");
  };

  return (
    <main className="mainContainer">
      <Header />
      <section>
        <h2 className="title">Company Register</h2>
        <CompanyForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          textBtn="Next Step"
        />
        <div className="bgImg"></div>
      </section>
    </main>
  );
};
export default CompanyRegister;
