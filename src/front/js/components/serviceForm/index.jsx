import React from "react";
import Input from "../input/index.jsx";
import styles from "./serviceForm.module.css";
import Button from "../button/index.jsx";

const ServiceForm = ({ newService, handleSubmit, handleChange, textBtn }) => {
  return (
    <main className={styles._mainContainerImg}>
      <div className={styles._parentTwo}>
        <div className={styles._childTwo}>
          <h2 className={styles._titleService}>Create new service</h2>
          <form
            className={styles._form}
            onChange={handleChange}
            onSubmit={handleSubmit}
          >
            <Input
              icon={<i className="fa-solid fa-circle-user"></i>}
              type="text"
              placeholder="Name"
              name="name"
              value={newService.name}
            />
            <Input
              icon={<i className="fa-solid fa-pen-to-square"></i>}
              type="text"
              placeholder="Description"
              name="description"
              value={newService.description}
            />
            <Input
              icon={<i className="fa-regular fa-clock"></i>}
              type="text"
              placeholder="Service duration"
              name="service_duration"
              value={newService.service_duration}
            />
            <Input
              icon={<i className="fa-solid fa-coins"></i>}
              type="text"
              placeholder="Price"
              name="price"
              value={newService.price}
            />
            <Button type="submit" title={textBtn} />
          </form>
        </div>
      </div>
    </main>
  );
};
export default ServiceForm;
