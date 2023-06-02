import React, { useEffect, useState } from "react";
import { getBookingByUser, deleteBooking } from "../../service/booking";
import "../../pages/userDashboard/styles.css";

import { format } from "date-fns";
import Header from "../../components/header/index.jsx";
import BookingCard from "../../components/bookingCard/index.jsx";
import BigContainer from "../../components/bigContainer/index.jsx";

const UserDashboard = () => {
  const [bookingList, setBookingList] = useState([]);
  const [deletedBooking, setDeletedBooking] = useState({});

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
      <Header />
      <main className="main-container">
        <BigContainer>
          <h1>List of Reservations</h1>
          <div className="list-container">
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
                  deleteReservation={() => deleteReservation(booking.id)}
                />
              );
            })}
          </div>
        </BigContainer>
      </main>
    </div>
  );
};

export default UserDashboard;
