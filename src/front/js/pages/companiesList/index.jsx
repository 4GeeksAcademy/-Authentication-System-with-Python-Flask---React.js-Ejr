import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import "./styles.css";
=======
import styles from "./companiesList.module.css";
>>>>>>> dev
import Logotipo from "../../components/logotipo/index.jsx";
import BigContainer from "../../components/bigContainer/index.jsx";
import ItemContainer from "../../components/itemContainer/index.jsx";
import { useNavigate } from "react-router-dom";
import { listCompanies } from "../../service/company";

const CompaniesList = () => {
  const [companiesList, setCompaniesList] = useState([]);

  const getCompanies = async () => {
    const list = await listCompanies();
    setCompaniesList(list);
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const navigate = useNavigate();
  return (
<<<<<<< HEAD
    <main className="main-container">
      <Logotipo className="logo" />
      <BigContainer>
        <h1>Companies repository</h1>
        <div className="list-container">
          {companiesList.map((company) => (
            <ItemContainer
              key={company.id}
              title={company.name}
              onClick={() => navigate(`/company/${company.id}`)}
=======
    <main className={styles._mainContainer}>
      <div className={styles._logotipo}>
        <Logotipo />
      </div>
      <BigContainer>
        <h1 className={styles._heading}>Companies repository</h1>
        <div className={styles._listContainer}>
          {companiesList?.map((company) => (
            <ItemContainer
              key={company.id}
              title={company.name}
              onClick={() => navigate(`/company-details/${company.id}`)}
>>>>>>> dev
            />
          ))}
        </div>
      </BigContainer>
    </main>
  );
};

export default CompaniesList;
