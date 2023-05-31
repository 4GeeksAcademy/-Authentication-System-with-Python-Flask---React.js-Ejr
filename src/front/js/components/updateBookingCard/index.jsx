import React from "react";
import styles from "./updateBookingCard.module.css";
import Input from "../input/index.jsx";
import Button from "../button/index.jsx";
// import UpdateMessage from "../updateMessage/index.jsx";

// list, handleSubmit, handleChange, isUpdated
const UpdateBookingList = ({ textBtn }) => {
  return (
    <>
      {/* {isUpdated && <UpdateMessage />} */}
      <main className={styles._mainContainerImg}>
        <div className={styles._parentTwo}>
          <div className={styles._childTwo}>
            <h2 className={styles._titleService}>Update service</h2>
            <form className={styles._form}>
              <Input
                icon={<i className="fa-solid fa-circle-user"></i>}
                type="number"
                placeholder="Worker"
                name="worker"
                // value={list.name}
              />
              <Input
                icon={<i className="fa-solid fa-circle-user"></i>}
                type="number"
                placeholder="Service"
                name="service"
                // value={list.description}
              />
              <Input
                icon={<i className="fa-regular fa-clock"></i>}
                type="text"
                placeholder="Booking Time"
                name="start_service"
                // value={list.service_duration}
              />
              <Input
                icon={<i className="fa-solid fa-pen-to-square"></i>}
                type="text"
                placeholder="description"
                name="description"
                // value={list.price}
              />
              <Button type="submit" title={textBtn} />
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default UpdateBookingList;
