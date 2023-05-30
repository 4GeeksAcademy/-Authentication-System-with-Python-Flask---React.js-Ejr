import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./adminCreateBooking.module.css";
import Navbar from "../../components/navbar/index.jsx";
import BigContainer from "../../components/bigContainer/index.jsx";
import ReservationForm from "../../components/reservationForm/index.jsx";
import { listWorkers } from "../../service/workers";
import { listServicesByCompany } from "../../service/services";
import { adminCreateBooking } from "../../service/booking.js";

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

  const { company_id } = useParams();

  const getWorkers = async () => {
    const workers = await listWorkers(company_id);
    setWorkersList(workers);
  };

  const getServices = async () => {
    const services = await listServicesByCompany(company_id);
    setServicesList(services);
  };

  const handleChange = ({ target }) => {
    setNewBooking({ ...newBooking, [target.name]: target.value });
  };

  console.log(newBooking);

  const transformData = () => {
    const workerID = workersList.filter(
      (worker) => worker.user.username === newBooking.worker
    )[0]?.id;
    const serviceID = servicesList.filter(
      (service) => service.name === newBooking.service
    )[0]?.id;
    return {
      worker_id: workerID,
      service_id: serviceID,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewBooking({});
    const data = await adminCreateBooking(company_id, transformData());

    console.log("DATA =======>", data);
    // navigate to admin dashboard if admin if worker to worker dashboard
  };

  useEffect(() => {
    getWorkers();
    getServices();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles._mainContainer}>
        <BigContainer>
          <h1>Create Booking</h1>
          <ReservationForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            workersList={workersList}
            servicesList={servicesList}
          />
        </BigContainer>
      </div>
    </div>
  );
};

export default AdminCreateBooking;
