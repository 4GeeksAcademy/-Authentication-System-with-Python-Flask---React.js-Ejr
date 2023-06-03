import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./createNewBooking.module.css";
import BigContainer from "../../components/bigContainer/index.jsx";
import ReservationForm from "../../components/reservationForm/index.jsx";
import { listServicesByCompany } from "../../service/services.js";
import { listWorkers } from "../../service/workers.js";
import { createBooking } from "../../service/booking.js";
import { getAllServiceWorkers } from "../../service/service_worker.js";
import Spinner from "../../components/spinner/index.jsx";
import { toast } from "react-toastify";
import Header from "../../components/header/index.jsx";

const initialState = {
  service: "",
  worker: "",
  start_service: "",
  description: "",
};

const CreateNewBooking = () => {
  const [workersList, setWorkersList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [newBooking, setNewBooking] = useState(initialState);
  const [serviceWorkers, setServiceWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { company_id } = useParams();

  const listServiceWorkers = async () => {
    setIsLoading(true);
    const allServiceWorkers = await getAllServiceWorkers();
    setServiceWorkers(allServiceWorkers);
    setIsLoading(false);
  };

  const servicesByCompany = async () => {
    setIsLoading(true);
    const services = await listServicesByCompany(company_id);
    setServicesList(services);
    setIsLoading(false);
  };

  const workersByCompany = async () => {
    const workers = await listWorkers(company_id);
    setWorkersList(workers);
  };

  useEffect(() => {
    servicesByCompany();
    listServiceWorkers();
    workersByCompany();
  }, []);

  console.log(servicesByCompany);

  const handleServiceSelect = async (e) => {
    const service = servicesList.find(({ name }) => name === e.target.value);
    const newListWorkers = [];
    serviceWorkers.forEach((serviceWorker) => {
      if (serviceWorker.service_id === service.id) {
        newListWorkers.push(serviceWorker.workers);
      }
    });
    setWorkersList(newListWorkers);
  };

  const handleWorkerSelect = async (e) => {
    const worker = workersList.find(
      ({ user }) => user.username === e.target.value
    );
    const newListServices = [];
    serviceWorkers.forEach((serviceWorker) => {
      if (serviceWorker.worker_id === worker.id) {
        newListServices.push(serviceWorker.services);
      }
    });
    setServicesList(newListServices);
  };

  const handleChange = ({ target }) => {
    setNewBooking({ ...newBooking, [target.name]: target.value });
  };

  const transformedData = () => {
    const serviceID = servicesList.filter(
      (service) => service.name === newBooking.service
    )[0]?.id;
    const workerID = workersList.filter(
      (worker) => worker.user.username === newBooking.worker
    )[0]?.id;
    const startService = newBooking.start_service;
    const description = newBooking.description;
    return {
      service: serviceID,
      worker: workerID,
      start_service: startService,
      description: description,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resMsg = await createBooking(company_id, transformedData());
    resMsg.data ? toast.success(resMsg?.msg) : toast.error(resMsg?.msg);
    navigate("/user-dashboard");
  };

  console.log(transformedData());

  return (
    <>
      <Header />
      <div className={styles._mainContainer}>
        {!isLoading ? (
          <ReservationForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            workersList={workersList}
            servicesList={servicesList}
            handleServiceSelect={handleServiceSelect}
            handleWorkerSelect={handleWorkerSelect}
            textBtn="Create"
          />
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default CreateNewBooking;
