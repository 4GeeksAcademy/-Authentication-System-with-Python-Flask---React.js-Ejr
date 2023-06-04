import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import { getBookingByCompany } from "../../service/booking";
import { getUserProfile } from "../../service/user";
import { format } from "date-fns";
import { toast } from "react-toastify";

import styles from "./workerDashboard.module.css";

import BookingCard from "../../components/bookingCard/index.jsx";
import BigContainer from "../../components/bigContainer/index.jsx";
import Button from "../../components/button/index.jsx";
import DeleteToast from "../../components/deleteToast/index.jsx";
import Spinner from "../../components/spinner/index.jsx";
import Header from "../../components/header/index.jsx";
import SubHeader from "../../components/subHeader/index.jsx";

const WorkerDashboard = () => {
  const { store, actions } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  const [bookingList, setBookingList] = useState([]);
  const [bookingsByWorker, setBookingsByWorker] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { companyId } = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    const user = await getUserProfile();
    actions.saveUserProfileData(user);
  };

  const getBookings = async () => {
    const bookings = await getBookingByCompany(companyId);
    setBookingList(bookings);
  };

  const getBookingsByWorker = () => {
    const localStorageData = JSON.parse(
      localStorage.getItem("token/role/company_id")
    );
    const { worker_id } = localStorageData;

    console.log(worker_id);

    const bookingsByWorkerId = bookingList.filter(
      (booking) => booking?.services_workers?.worker_id === worker_id
    );
    console.log("bookings by worker ID -->", bookingsByWorkerId);
    setBookingsByWorker(bookingsByWorkerId);
  };

  useEffect(() => {
    fetchUser();
    getBookings();
  }, []);

  useEffect(() => {
    if (bookingList?.length > 0) {
      getBookingsByWorker();
    }
  }, [bookingList]);

  console.log("bookings list", bookingList);
  console.log("bookings by worker state", bookingsByWorker);

  return (
    <div>
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
        settingsTitle="Worker Settings"
        settings={<div className={styles._workerSettings}></div>}
      />
      <SubHeader
        navigate={() => navigate(`/admin-create-booking/${companyId}`)}
      />
      <main className={styles._mainContainer}>
        <BigContainer>
          <h1 className={styles._heading}>List of Reservations</h1>
          <div className={styles._bookingsContainer}>
            {Loading ? (
              <Spinner />
            ) : bookingsByWorker.length === 0 ? (
              <p>You have no bookings assigned yet!</p>
            ) : (
              bookingsByWorker.map((booking) => (
                <div
                  className={`${styles._bookingContainer} _boxShadow`}
                  key={booking.id}
                >
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
              ))
            )}
          </div>
        </BigContainer>
      </main>
    </div>
  );
};
export default WorkerDashboard;
