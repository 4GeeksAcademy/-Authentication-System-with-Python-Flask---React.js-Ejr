import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/index.jsx";
import UpdateBookingList from "../../components/updateBookingCard/index.jsx";
import { useParams } from "react-router-dom";
import { getBookingByUser, updateBooking } from "../../service/booking.js";
import { toast } from "react-toastify";

const initialState = {
  worker: "",
  service: "",
  start_service: "",
  description: "",
};

const UpdateBooking = () => {
  const { bookingID } = useParams();
  const [formData, setFormData] = useState(initialState);
  const [workerList, setWorkerList] = useState([]);
  const [serviceList, setServiceList] = useState([]);

  const responseToast = (msg) => toast(msg);

  const getBooking = async () => {
    const bookingData = await getBookingByUser();

    // Filter by workers unique
    const uniqueWorkers = bookingData.reduce((workers, booking) => {
      const worker = booking.services_workers.workers;
      if (!workers.some((w) => w.id === worker.id)) {
        workers.push(worker);
      }
      return workers;
    }, []);
    setWorkerList(uniqueWorkers);

    // Filter by services unique
    const uniqueServices = bookingData.reduce((services, booking) => {
      const service = booking.services_workers.services;
      if (!services.some((s) => s.id === service.id)) {
        services.push(service);
      }
      return services;
    }, []);
    setServiceList(uniqueServices);
  };

  useEffect(() => {
    getBooking();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData(initialState);
    const booking = await updateBooking(bookingID, formData);
    setFormData(booking);
    responseToast(booking.msg);
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  return (
    <>
      <Navbar />
      <UpdateBookingList
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        textBtn="Update"
        workerList={workerList}
        serviceList={serviceList}
      />
    </>
  );
};
export default UpdateBooking;
