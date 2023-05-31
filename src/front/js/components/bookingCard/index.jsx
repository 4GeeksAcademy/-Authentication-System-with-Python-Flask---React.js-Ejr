import React from "react";
import styles from "./bookingCard.module.css";
const BookingCard = ({
  service,
  date,
  worker,
  setIsOpen,
  deleteReservation,
}) => {
  return (
    <div className={`${styles._bookingContainer} _boxShadow`}>
      <span onClick={setIsOpen}>
        {date} | {service} with {worker}
      </span>
      <button className={styles._button} onClick={deleteReservation}>
        x
      </button>
    </div>
  );
};

export default BookingCard;
