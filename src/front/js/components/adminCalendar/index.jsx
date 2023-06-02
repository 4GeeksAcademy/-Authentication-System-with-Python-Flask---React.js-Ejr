import React, { useEffect, useState } from "react";
import styles from "./adminCalendar.module.css";
import { listWorkers } from "../../service/workers";
import Avatar from "../avatar/index.jsx";
import { getBookingByCompany } from "../../service/booking";
import Modal from "../modal/index.jsx";
import { format } from "date-fns";

const AdminCalendar = ({ companyId }) => {
  const [workersList, setWorkersList] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [bookingsByWorker, setBookingsByWorker] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const getWorkers = async () => {
    const workers = await listWorkers(companyId);
    setWorkersList(workers);
  };

  const getBookings = async () => {
    const bookings = await getBookingByCompany(companyId);
    setBookingList(bookings);
  };

  const handleClick = (workerId) => {
    const bookingsByWorkerId = bookingList.filter(
      (bookings) => bookings?.services_workers.worker_id === workerId
    );
    setBookingsByWorker(bookingsByWorkerId);
    setIsOpen(true);
  };

  useEffect(() => {
    getWorkers();
    getBookings();
  }, []);

  return (
    <div className={styles._mainContainer}>
      <div className={styles._contentContainer}>
        <h1 className={styles._title}>Workers</h1>
        <div className={styles._workersContainer}>
          {workersList ? (
            workersList.map((worker) => (
              <div
                onClick={() => handleClick(worker.id)}
                key={worker.id}
                className={styles._workerImg}
              >
                <Avatar url={worker.user.avatar} />
                <p>{worker.user.username}</p>
              </div>
            ))
          ) : (
            <p>There are no workers registered yet!</p>
          )}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        bookingsByWorker={bookingsByWorker}
      >
        <div className={styles._modalContent}>
          <p>
            <strong>
              {bookingsByWorker[0]?.services_workers.workers.user.username}{" "}
              bookings
            </strong>
          </p>
          {bookingsByWorker.map((booking) => (
            <div className={`${styles._booking} _boxShadow`} key={booking.id}>
              <p>
                <strong>Name: </strong>
                {booking.services_workers.services.name}
              </p>
              <p>
                <strong>Price: </strong>
                {booking.services_workers.services.price}€
              </p>
              <p>
                <strong>Start: </strong>
                {format(new Date(booking.start_service), "iii 'at' p")}
              </p>
              <p>
                <strong>Duration: </strong>
                {booking.services_workers.services.service_duration}minutes
              </p>
              <p>
                <strong>Description: </strong>
              </p>
              <p>{booking.services_workers.services.description}</p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default AdminCalendar;
