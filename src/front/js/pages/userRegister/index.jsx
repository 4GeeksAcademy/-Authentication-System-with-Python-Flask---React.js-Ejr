import React, { useState } from "react";
import { registerUser } from "../../service/user";
import "./styles.css";
import UserForm from "../../components/userForm/index.jsx";
import Header from "../../components/header/index.jsx";
import { useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

const UserRegister = () => {
  const [newUser, setNewUser] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setNewUser({ ...newUser, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(newUser);
    navigate("/user-dashboard");
  };

  return (
    <main className="mainContainer">
      <Header />
      <section>
        <h2 className="title">User Register</h2>
        <UserForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          textBtn="Register"
        />
        <div className="bgImg"></div>
      </section>
    </main>
  );
};
export default UserRegister;
