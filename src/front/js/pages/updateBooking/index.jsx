import React from "react";
import Navbar from "../../components/navbar/index.jsx";
import UpdateBookingList from "../../components/updateBookingCard/index.jsx";
import { useParams } from "react-router-dom";

const UpdateBooking = () => {
  const { bookingID } = useParams();
  // esta  llegando el id y esta navegando bien
  return (
    <>
      <Navbar />
      <UpdateBookingList textBtn="Update" />
    </>
  );
};
export default UpdateBooking;
