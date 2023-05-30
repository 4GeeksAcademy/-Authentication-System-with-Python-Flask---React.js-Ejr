import React from "react";
import styles from "./workerForm.module.css";
import Input from "../input/index.jsx";

const WorkerForm = ({ newWorker, handleSubmit, handleChange }) => {
  return (
    <>
      <main className={styles._mainContainerImg}>
        <div className={styles._parentTwo}>
          <div className={styles._childTwo}>
            <h2 className={styles._titleService}>Create Worker</h2>
            <form onChange={handleChange} onSubmit={handleSubmit}>
              <Input
                icon={<i className="fa-solid fa-circle-user"></i>}
                type="text"
                placeholder="Username"
                name="username"
                value={newWorker.username}
              />
              <Input
                icon={<i className="fa-solid fa-circle-user"></i>}
                type="text"
                placeholder="Firstname"
                name="firstname"
                value={newWorker.firstname}
              />
              <Input
                icon={<i className="fa-solid fa-pen-to-square"></i>}
                type="text"
                placeholder="Lastname"
                name="lastname"
                value={newWorker.lastname}
              />
              <Input
                icon={<i className="fa-regular fa-clock"></i>}
                type="text"
                placeholder="Working schedule"
                name="working_schedule"
                value={newWorker.working_schedule}
              />
              <Input
                icon={<i className="fa-regular fa-clock"></i>}
                type="email"
                placeholder="email"
                name="email"
                value={newWorker.email}
              />
              <Input
                icon={<i className="fa-solid fa-coins"></i>}
                type="password"
                placeholder="password"
                name="password"
                value={newWorker.password}
              />
              <button type="submit" className={`${styles._loginBtn} boxShadow`}>
                Create
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default WorkerForm;
