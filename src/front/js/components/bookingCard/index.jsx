import React from "react";
import "./styles.css";

const BookingCard = ({ service, date, worker, deleteReservation }) => {
  return (
    <div className="booking-container boxShadow">
      <span>
        {date} | {service} with {worker}
      </span>
      <button className="button" onClick={deleteReservation}>
        x
      </button>
    </div>
  );
};

export default BookingCard;
