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
          {step === 1 && (
            <>
              <div className={styles._dropdownContainer}>
                <p className={styles._firstTitle}>1/3</p>
                <p className={styles._secondTitle}>
                  Assign Services to Workers
                </p>
                <p className={styles._thirdTitle}>Select Your Worker</p>
                <div className={styles._inputContainer}>
                  <i className="fa-solid fa-circle-user"></i>
                  <select
                    name="worker"
                    className={`${styles._select} _boxShadow`}
                    onChange={handleChange}
                    value={serviceWorker.worker}
                  >
                    <option value="">Select the worker</option>
                    {workersList.map((op) => (
                      <option key={op.id} value={op.user.username}>
                        {op.user.username}
                      </option>
                    ))}
                  </select>
                  {serviceWorker.worker === "" && (
                    <p className={styles._errorText}>Please select a worker</p>
                  )}
                </div>
              </div>
              <div className={styles._buttonNext}>
                <Button type="button" title="Next" onClick={handleNextStep} />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className={styles._dropdownContainer}>
                <p className={styles._firstTitle}>2/3</p>
                <p className={styles._secondTitle}>
                  Assign Services to Workers
                </p>
                <p className={styles._thirdTitle}>Select Your Service</p>
                <div className={styles._inputContainer}>
                  <i className="fa-solid fa-circle-user"></i>
                  <select
                    name="service"
                    className={`${styles._select} _boxShadow`}
                    onChange={handleChange}
                    value={serviceWorker.service}
                  >
                    <option value="">Select the service</option>
                    {servicesList.map((op) => (
                      <option key={op.id} value={op.name}>
                        {op.name}
                      </option>
                    ))}
                  </select>
                  {serviceWorker.service === "" && (
                    <p className={styles._errorText}>Please select a service</p>
                  )}
                </div>
                <div className={styles._buttonPrevious}>
                  <div className={styles._buttonInside}>
                    <Button
                      type="button"
                      title="Previous"
                      onClick={handlePreviousStep}
                    />
                  </div>
                  <div className={styles._buttonInside}>
                    <Button
                      type="submit"
                      title="Create"
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </BigContainer>
      </main>
    </>
  );
};

export default ServicesWorkers;
