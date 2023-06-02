import React, { useEffect, useState } from "react";
import { getBookingByUser, deleteBooking } from "../../service/booking";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";

import styles from "./userDashboard.module.css";

import BookingCard from "../../components/bookingCard/index.jsx";
import BigContainer from "../../components/bigContainer/index.jsx";
import Modal from "../../components/modal/index.jsx";
import Button from "../../components/button/index.jsx";
import Header from "../../components/header/index.jsx";
import DeleteToast from "../../components/deleteToast/index.jsx";
import Spinner from "../../components/spinner/index.jsx";

const initialState = {
  services_workers: {
    services: {
      name: "",
      created_at: "",
      service_duration: "",
      description: "",
    },
  },
};

const UserDashboard = () => {
  const [bookingList, setBookingList] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(initialState);
  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getBooking = async () => {
    setLoading(true);
    const bookingData = await getBookingByUser();
    setBookingList(bookingData);
    setLoading(false);
  };
  useEffect(() => {
    getBooking();
  }, []);

  const deleteReservation = async (bookingID) => {
    const resMsg = await deleteBooking(bookingID);
    await getBooking();
    resMsg.data ? toast.success(resMsg?.msg) : toast.error(resMsg?.msg);
  };

  return (
    <div>
      <Header />
      <main className={styles._mainContainer}>
        <BigContainer>
          <h1 className={styles._title}>List of Reservations</h1>
          {Loading ? (
            <Spinner />
          ) : (
            <div className={styles._listContainer}>
              {bookingList.map((booking) => {
                return (
                  <BookingCard
                    key={booking.id}
                    date={format(
                      new Date(booking.start_service),
                      "MMM do yyyy 'at' hh:mm"
                    )}
                    service={booking.services_workers.services.name}
                    worker={booking.services_workers.workers.user.username}
                    setIsOpen={() => {
                      setSelectedBooking(booking);
                      setIsOpen(true);
                    }}
                    handleDelete={() =>
                      toast.error(
                        <DeleteToast
                          msg="Delete this booking?"
                          action={() => deleteReservation(booking.id)}
                        />,
                        { autoClose: false }
                      )
                    }
                  />
                );
              })}
            </div>
          )}
        </BigContainer>

        <Modal
          title="Booking Details"
          isOpen={isOpen}
          close={() => setIsOpen(false)}
          selectedBooking={selectedBooking}
        >
          <div className={styles._modalContent}>
            <p>
              <strong> Service: </strong>
              {selectedBooking?.services_workers.services.name}
            </p>
            <p>
              <strong>Date and time: </strong>
              {selectedBooking?.services_workers.services.created_at}
            </p>

            <p>
              <strong> Duration: </strong>
              {selectedBooking?.services_workers.services.service_duration}{" "}
              hours
            </p>
            <p>
              <strong>Description: </strong>
              {selectedBooking?.services_workers.services.description}
            </p>

            <div className={styles._modalFooter}>
              <p>
                <strong>Do you want to change your appointment??</strong>
              </p>
              <div className={styles._btnWrapper}>
                <Button
                  title="Update"
                  onClick={() =>
                    navigate(`/update-booking/${selectedBooking?.id}`)
                  }
                />
                <Button
                  title="Delete"
                  onClick={() =>
                    toast.error(
                      <DeleteToast
                        msg="Delete this booking?"
                        action={() => deleteReservation(selectedBooking?.id)}
                      />,
                      { autoClose: false }
                    )
                  }
                />
              </div>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default UserDashboard;
