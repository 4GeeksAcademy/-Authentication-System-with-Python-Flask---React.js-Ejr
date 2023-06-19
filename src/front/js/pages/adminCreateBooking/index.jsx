import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import styles from "./adminCreateBooking.module.css";
import AdminReservationForm from "../../components/adminReservationForm/index.jsx";
import { listServicesByCompany } from "../../service/services.js";
import { listWorkers } from "../../service/workers.js";
import { adminCreateBooking } from "../../service/booking.js";
import { getAllServiceWorkers } from "../../service/service_worker.js";
import { toast } from "react-toastify";
import Header from "../../components/header/index.jsx";

const initialState = {
  service: "",
  worker: "",
  start_service: "",
  description: "",
};

const AdminCreateBooking = () => {
  const [workersList, setWorkersList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [newBooking, setNewBooking] = useState(initialState);
  const [serviceWorkers, setServiceWorkers] = useState([]);

  const { store } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  const navigate = useNavigate();
  const { company_id } = useParams();

  const listServiceWorkers = async () => {
    const allServiceWorkers = await getAllServiceWorkers();
    setServiceWorkers(allServiceWorkers);
  };

  const servicesByCompany = async () => {
    const services = await listServicesByCompany(company_id);
    setServicesList(services);
  };

  const workersByCompany = async () => {
    const workers = await listWorkers(company_id);
    setWorkersList(workers);
  };

  useEffect(() => {
    listServiceWorkers();
    servicesByCompany();
    workersByCompany();
  }, []);

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
    const resMsg = await adminCreateBooking(company_id, transformedData());
    resMsg.data ? toast.success(resMsg?.msg) : toast.error(resMsg?.msg);
    if (resMsg.data.services_workers.workers.user.role_id === 3) {
      navigate(`/worker-dashboard/${company_id}`);
    } else {
      navigate(`/admin-dashboard/${company_id}`);
    }
  };

  console.log(newBooking);

  return (
    <>
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
      />
      <div className={styles._mainContainer}>
        <AdminReservationForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          workersList={workersList}
          servicesList={servicesList}
          handleServiceSelect={handleServiceSelect}
          handleWorkerSelect={handleWorkerSelect}
          textBtn="Create"
        />
      </div>
    </>
  );
};

export default AdminCreateBooking;
