import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./servicesWorkers.module.css";
import Header from "../../components/header/index.jsx";
import BigContainer from "../../components/bigContainer/index.jsx";
import Button from "../../components/button/index.jsx";

import { getUserProfile } from "../../service/user";
import { listWorkers } from "../../service/workers";
import { listServicesByCompany } from "../../service/services";
import { createServiceWorker } from "../../service/service_worker";
import { toast } from "react-toastify";

const initialState = {
  worker: "",
  service: "",
};

const ServicesWorkers = () => {
  const { store, actions } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  const [workersList, setWorkersList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [serviceWorker, setServiceWorker] = useState(initialState);

  const { company_id } = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    const user = await getUserProfile();
    actions.saveUserProfileData(user);
  };

  const getWorkers = async () => {
    const workers = await listWorkers(company_id);
    setWorkersList(workers);
  };

  const getServices = async () => {
    const services = await listServicesByCompany(company_id);
    setServicesList(services);
  };

  const handleChange = ({ target }) => {
    setServiceWorker({ ...serviceWorker, [target.name]: target.value });
  };

  const transformData = () => {
    const serviceID = servicesList.filter(
      (service) => service.name === serviceWorker.service
    )[0]?.id;
    const workerID = workersList.filter(
      (worker) => worker.user.username === serviceWorker.worker
    )[0]?.id;
    return {
      worker_id: workerID,
      service_id: serviceID,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resMsg = await createServiceWorker(company_id, transformData());
    resMsg.data ? toast.success(resMsg?.msg) : toast.error(resMsg?.msg);
    navigate(`/admin-dashboard/${company_id}`);
  };

  useEffect(() => {
    getWorkers();
    getServices();
    fetchUser();
  }, []);

  return (
    <>
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
      />
      <main className={styles._mainContainer}>
        <BigContainer>
          <h1>Assign Services to Workers</h1>
          <div className={styles._dropdownContainer}>
            <form onChange={handleChange} onSubmit={handleSubmit}>
              <select name="worker" className={`${styles._select} _boxShadow`}>
                {workersList.map((op) => (
                  <option key={op.id}>{op.user.username}</option>
                ))}
              </select>
              <select name="service" className={`${styles._select} _boxShadow`}>
                {servicesList.map((op) => (
                  <option key={op.id}>{op.name}</option>
                ))}
              </select>
              <Button type="submit" title="Create" />
            </form>
          </div>
        </BigContainer>
      </main>
    </>
  );
};

export default ServicesWorkers;
