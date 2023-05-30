import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import "../../pages/userDashboard/styles.css";
import Navbar from "../../components/navbar/index.jsx";
import BookingCard from "../../components/bookingCard/index.jsx";
import { getBookingByUser } from "../../service/booking";
import { deleteBooking } from "../../service/booking";
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
      <Navbar />
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
