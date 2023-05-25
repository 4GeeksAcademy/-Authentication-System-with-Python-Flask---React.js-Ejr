import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/index.jsx";
import { loginUser } from "../../service/user";
import "./styles.css";
import LoginForm from "../../components/loginForm/index.jsx";

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
    if (data.role === "client") navigate("/user-dashboard");
    if (data.role === "worker") navigate("/worker-dashboard");
  };

  return (
    <main className="mainContainer">
      <Header />
      <section>
        <h2 className="title">Login</h2>
        <LoginForm handleSubmit={handleSubmit} handleChange={handleChange} />
        <div className="bgImg"></div>
      </section>
    </main>
  );
};
export default LoginPage;
