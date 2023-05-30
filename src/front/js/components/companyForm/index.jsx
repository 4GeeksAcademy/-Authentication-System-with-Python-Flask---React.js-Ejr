import React from "react";
import Input from "../input/index.jsx";
import styles from "./companyForm.module.css";
import Button from "../button/index.jsx";

const CompanyForm = ({ handleChange, handleSubmit, textBtn }) => (
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
    />
    <Input
      icon={<i className="fa-solid fa-circle-user"></i>}
      type="text"
      placeholder="CIF"
      name="cif"
    />
    <Input
      icon={<i className="fa-solid fa-circle-user"></i>}
      type="textarea"
      placeholder="Description"
      name="description"
    />
    <Input
      icon={<i className="fa-solid fa-envelope"></i>}
      type="text"
      placeholder="Address"
      name="address"
    />
    <Input
      icon={<i className="fa-solid fa-calendar-days"></i>}
      type="text"
      placeholder="Working Schedule"
      name="working_schedule"
    />
    <Button type="submit" title={textBtn} />
  </form>
);

export default CompanyForm;
