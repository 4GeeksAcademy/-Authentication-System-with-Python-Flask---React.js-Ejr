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
  const [step, setStep] = useState(1);

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
    try {
      const resMsg = await createServiceWorker(company_id, transformData());
      if (resMsg.data) {
        toast.success(resMsg?.msg);
        navigate(`/admin-dashboard/${company_id}`);
      } else {
        toast.error(resMsg?.msg);
      }
    } catch (error) {
      console.error("Error creating service worker:", error);
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
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
          {step === 1 && (
            <div className={styles._dropdownContainer}>
              <h1>Select Worker</h1>
              <select
                name="worker"
                className={`${styles._select} _boxShadow`}
                onChange={handleChange}
                value={serviceWorker.worker}
              >
                <option value="">Select Worker</option>
                {workersList.map((op) => (
                  <option key={op.id} value={op.user.username}>
                    {op.user.username}
                  </option>
                ))}
              </select>
              <Button type="button" title="Next" onClick={handleNextStep} />
            </div>
          )}
          {step === 2 && (
            <div className={styles._dropdownContainer}>
              <h1>Select Servicio</h1>
              <select
                name="service"
                className={`${styles._select} _boxShadow`}
                onChange={handleChange}
                value={serviceWorker.service}
              >
                <option value="">Select Service</option>
                {servicesList.map((op) => (
                  <option key={op.id} value={op.name}>
                    {op.name}
                  </option>
                ))}
              </select>
              <Button
                type="button"
                title="Previous"
                onClick={handlePreviousStep}
              />
              <Button type="submit" title="Create" onClick={handleSubmit} />
            </div>
          )}
        </BigContainer>
      </main>
    </>
  );
};

export default ServicesWorkers;
