import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service/user.js";
import styles from "./login.module.css";
import LoginForm from "../../components/loginForm/index.jsx";
import bgImg from "../../../../assets/bgImg.jpeg";
import Logotipo from "../../components/logotipo/index.jsx";

const initialState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [newLogin, setNewLogin] = useState(initialState);

  const handleChange = ({ target }) => {
    setNewLogin({ ...newLogin, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(newLogin);

    if (data.role === "admin") navigate("/admin-dashboard");
    if (data.role === "client") navigate("/user-dashboard/");
    if (data.role === "worker") navigate("/worker-dashboard");
  };

  return (
    <main className={styles._mainContainer}>
      <section className={styles._sectionContainer}>
        <img
          className={styles._bgImg}
          src={bgImg}
          alt="Woman booking a service in your computer"
        />
        <div className={styles._actionContainer}>
          <Logotipo />
          <h1 className={styles._heading}>Login</h1>
          <LoginForm handleSubmit={handleSubmit} handleChange={handleChange} />
          <span className={styles._credits}>
            Photo by Andrew Neel on Unsplash
          </span>
          <span className={`${styles._line} _gradient1`}></span>
        </div>
      </section>
    </main>
  );
};
export default LoginPage;
