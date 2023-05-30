import React from "react";
import Input from "../input/index.jsx";
import Button from "../button/index.jsx";
import styles from "./login.module.css";

const LoginForm = ({ handleChange, handleSubmit }) => (
  <form
    className={styles._form}
    onChange={handleChange}
    onSubmit={handleSubmit}
  >
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
    <Button type="submit" title="Login" />
  </form>
);

export default LoginForm;
