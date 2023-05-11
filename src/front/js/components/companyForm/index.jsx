import React from "react";
import Input from "../input/index.jsx";
import "./styles.css";

const CompanyForm = ({ handleChange, handleSubmit, textBtn }) => (
  <form onChange={handleChange} onSubmit={handleSubmit}>
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
    <button type="submit" className="submitBtn boxShadow">
      {textBtn}
    </button>
  </form>
);

export default CompanyForm;
