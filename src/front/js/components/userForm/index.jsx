import React from "react";
import Input from "../input/index.jsx";
import "./styles.css";

const UserForm = ({ handleChange, handleSubmit, textBtn }) => (
  <form onChange={handleChange} onSubmit={handleSubmit}>
    <Input
      icon={<i className="fa-solid fa-circle-user"></i>}
      type="text"
      placeholder="Username"
      name="username"
    />
    <Input
      icon={<i className="fa-solid fa-circle-user"></i>}
      type="text"
      placeholder="First Name"
      name="firstname"
    />
    <Input
      icon={<i className="fa-solid fa-circle-user"></i>}
      type="text"
      placeholder="Last Name"
      name="lastname"
    />
    <Input
      icon={<i className="fa-solid fa-envelope"></i>}
      type="email"
      placeholder="Email"
      name="email"
    />
    <Input
      icon={<i className="fa-solid fa-lock"></i>}
      type="password"
      placeholder="Password"
      name="password"
    />
    <button type="submit" className="submitBtn boxShadow">
      {textBtn}
    </button>
  </form>
);

export default UserForm;
