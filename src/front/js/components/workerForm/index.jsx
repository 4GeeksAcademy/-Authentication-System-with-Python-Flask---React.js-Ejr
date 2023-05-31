import React from "react";
import Input from "../input/index.jsx";
import styles from "./workerForm.module.css";
import Button from "../button/index.jsx";

const WorkerForm = ({ newWorker, handleSubmit, handleChange, textBtn }) => {
  return (
    <>
      <main className={styles._mainContainerImg}>
        <div className={styles._parentTwo}>
          <div className={styles._childTwo}>
            <h2 className={styles._titleService}>Create Worker</h2>
            <form
              className={styles._form}
              onChange={handleChange}
              onSubmit={handleSubmit}
            >
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
                icon={<i className="fa-solid fa-circle-user"></i>}
                type="text"
                placeholder="Lastname"
                name="lastname"
                value={newWorker.lastname}
              />
              <Input
                icon={<i className="fa-solid fa-calendar-days"></i>}
                type="text"
                placeholder="Working schedule"
                name="working_schedule"
                value={newWorker.working_schedule}
              />
              <Input
                icon={<i className="fa-solid fa-envelope"></i>}
                type="email"
                placeholder="email"
                name="email"
                value={newWorker.email}
              />
              <Input
                icon={<i className="fa-solid fa-lock"></i>}
                type="password"
                placeholder="password"
                name="password"
                value={newWorker.password}
              />
              <Button type="submit" title={textBtn} />
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default WorkerForm;
