import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service/user.js";

import styles from "./login.module.css";
import { bgImg } from "../../../../assets/assets.jsx";

import LoginForm from "../../components/loginForm/index.jsx";
import Logotipo from "../../components/logotipo/index.jsx";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [newLogin, setNewLogin] = useState(initialState);
  const [invalidDate, setInvalidDate] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setNewLogin({ ...newLogin, [target.name]: target.value });
  };

  const handleClick = async () => {
    try{
        setLoading(true)
        const data = await loginUser(newLogin);
        if (data.role === "admin")
          navigate(`/admin-dashboard/${data.company_id}`);
        if (data.role === "client") navigate("/user-dashboard");
        if (data.role === "worker")
          navigate(`/worker-dashboard/${data.company_id}`);
        toast.success("Login successfully");
        }catch(error) {
          setLoading(false)
          setInvalidDate(error.message);
      };
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
          <LoginForm handleClick={handleClick} handleChange={handleChange}
           invalidDate={invalidDate} loading={loading}/>
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
