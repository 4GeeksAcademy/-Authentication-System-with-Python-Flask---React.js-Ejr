import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import styles from "./userDashboard.module.css";
import Navbar from "../../components/navbar/index.jsx";
import BookingCard from "../../components/bookingCard/index.jsx";
import { getBookingByUser } from "../../service/booking";
import { deleteBooking } from "../../service/booking";
import BigContainer from "../../components/bigContainer/index.jsx";
import ModalBooking from "../../components/modalBooking/index.jsx";
import Button from "../../components/button/index.jsx";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [bookingList, setBookingList] = useState([]);
  const [deletedBooking, setDeletedBooking] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState({});

  const navigate = useNavigate();

  const getBooking = async () => {
    const bookingData = await getBookingByUser();
    setBookingList(bookingData);
  };

  const deleteReservation = async (booking_id) => {
    const deleted = await deleteBooking(booking_id);
    setDeletedBooking(deleted);
  };

  useEffect(() => {
    getBooking();
  }, [deletedBooking]);

  return (
    <div>
      <Navbar />
      <main className={styles._mainContainer}>
        <BigContainer>
          <h1 className={styles._title}>List of Reservations</h1>
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
                  deleteReservation={() => deleteReservation(booking.id)}
                />
              );
            })}
          </div>
        </BigContainer>
        <ModalBooking
          title="Booking Details"
          isOpen={isOpen}
          close={() => setIsOpen(false)}
          selectedBooking={selectedBooking}
        >
          <div className={styles._modalContent}>
            <p>
              <strong> Company ID: </strong>
              {selectedBooking?.company_id}
            </p>
            <p>
              <strong>Worker Service: </strong>
              {selectedBooking?.service_workers_id}
            </p>

            <p>
              <strong> reservation identifier : </strong>
              {selectedBooking?.id}
            </p>

            <p>
              <strong>Duration: </strong>
              {selectedBooking?.start_service} min
            </p>
            <p>
              <strong>Description: </strong>
              {selectedBooking?.description} min
            </p>

            <div className={styles._modalFooter}>
              <p>
                <strong>Do you want to update or delete this booking?</strong>
              </p>
              <div className={styles._btnWrapper}>
                <Button
                  title="Update"
                  onClick={() =>
                    navigate(`/update-booking/${selectedBooking?.id}`)
                  }
                />
                <Button title="Delete" />
              </div>
            </div>
          </div>
        </ModalBooking>
      </main>
    </div>
  );
};

export default UserDashboard;
