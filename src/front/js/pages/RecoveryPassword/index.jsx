import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Header from "../../components/header/index.jsx";
import Input from "../../components/input/index.jsx";

const RecoveryPassword = () => {
  const navigate = useNavigate();
  const handlesubmit = () => {
    navigate("/");
  };
  return (
    <>
      <Header />
      <main className="mainContainerimg">
        <div className="parenttwo">
          <div className="childtwo">
            <img
              src="https://pbs.twimg.com/profile_images/1243475459125456896/e-zIQiFY_400x400.jpg"
              alt="Daenerys Targaryen"
              onClick={handlesubmit}
            />

            <h5 className="nametitle">Danny Targaryen</h5>
            <p className="nametitle2">danny@email.com</p>

            <h2 className="title">Password recovery</h2>
            <form action="">
              <Input
                icon={<i className="fa-solid fa-envelope"></i>}
                type="email"
                placeholder="E-mail"
                name="meil"
              />

              <button type="button" className="loginBtn boxShadow">
                Send
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default RecoveryPassword;
