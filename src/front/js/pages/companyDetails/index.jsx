import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getInfoCompanyById } from "../../service/company";
import Logotipo from "../../components/logotipo/index.jsx";
import BigContainer from "../../components/bigContainer/index.jsx";
import Avatar from "../../components/avatar/index.jsx";

import styles from "./company-details.module.css";
import Button from "../../components/button/index.jsx";

const CompanyDetails = () => {
  const [company, setCompany] = useState({});
  const { companyId } = useParams();
  const navigate = useNavigate();

  const getCompany = async (companyId) => {
    const data = await getInfoCompanyById(companyId);
    setCompany(data);
  };

  useEffect(() => {
    getCompany(companyId);
  }, []);

  return (
    <div className={styles._mainContainer}>
      <Logotipo className={styles._logo} />
      <div className={styles._btnWrapper}>
        <Button
          type="button"
          title="Booking now"
          onClick={() => navigate(`/create-booking/${companyId}`)}
        />
      </div>
      <BigContainer>
        <h1>{company.name}</h1>
        <article className={styles._contentContainer}>
          <div className={styles._servicesContainer}>
            <span className={styles._serviceTitle}>Services:</span>
            <div className={`${styles._smallContainer} _boxShadow`}>
              {company.services?.map((service) => (
                <Link key={service.id} to="/">
                  <p>{service.name}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className={styles._infoContainer}>
            <div className={styles._row}>
              <span>Name:</span>
              <p>{company.name}</p>
            </div>
            <div className={styles._row}>
              <span>CIF:</span>
              <p>{company.cif}</p>
            </div>
            <div className={styles._row}>
              <span>Description:</span>
              <p>{company.description}</p>
            </div>
            <div className={styles._row}>
              <span>Address:</span>
              <p>{company.address}</p>
            </div>
            <div className={styles._row}>
              <span>Opening:</span>
              <p>{company.working_schedule}</p>
            </div>
            <div className={styles._workers}>
              <span>Workers:</span>
              <div className={styles._workersImagesContainer}>
                {company.workers?.map((worker) => (
                  <Link key={worker.id} to="/">
                    <div className={styles._workerImg}>
                      <Avatar />
                      <p>{worker.user?.username}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
      </BigContainer>
    </div>
  );
};

export default CompanyDetails;
