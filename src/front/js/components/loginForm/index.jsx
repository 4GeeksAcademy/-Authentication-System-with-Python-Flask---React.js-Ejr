import React from "react";
import Input from "../input/index.jsx";

const LoginForm = ({ handleChange, handleSubmit }) => (
  <form onChange={handleChange} onSubmit={handleSubmit}>
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
      Login
    </button>
  </form>
);

export default LoginForm;
