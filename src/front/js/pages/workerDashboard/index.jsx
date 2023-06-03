import React, { useEffect, useState } from "react";
import { getBookingByCompany } from "../../service/booking";
import { listWorkers } from "../../service/workers";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./workerDashboard.module.css";
import Header from "../../components/header/index.jsx";
import SubHeader from "../../components/subHeader/index.jsx";

const WorkerDashboard = () => {
  const [bookingList, setBookingList] = useState([]);
  const [worker, setWorker] = useState([]);
  const [workersList, setWorkersList] = useState([]);

  const { companyId } = useParams();
  const navigate = useNavigate();

  const getBookings = async () => {
    const bookings = await getBookingByCompany(companyId);
    setBookingList(bookings);
  };

  const getWorkers = async () => {
    const workers = await listWorkers(companyId);
    setWorkersList(workers);
  };

  const workerId = workersList.map((elem) => elem.id);
  console.log("workerId", workerId);

  const getBookingsByWorker = () => {
    const bookingsByWorkerId = bookingList.filter(
      (bookings) => bookings?.services_workers.worker_id === workerId
    );
    setWorker(bookingsByWorkerId);
  };

  useEffect(() => {
    getBookings();
    getWorkers();
    getBookingsByWorker();
  }, []);

  console.log("workers List", workersList);
  console.log("booking list", bookingList);
  console.log("worker", worker);

  return (
    <>
      <Header
        settingsTitle="Worker Settings"
        settings={<div className={styles._adminSettings}></div>}
      />
      <SubHeader
        navigate={() => navigate(`/admin-create-booking/${companyId}`)}
      />
    </>
  );
};
export default WorkerDashboard;
