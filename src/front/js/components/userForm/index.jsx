import React from "react";
import Input from "../input/index.jsx";
import styles from "./userForm.module.css";
import Button from "../button/index.jsx";

const UserForm = ({ handleChange, handleSubmit, textBtn }) => (
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
    <Button type="submit" title={textBtn} />
  </form>
);

export default UserForm;
