import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
// import styles from "./styles/Login.module.css"

export const Login = () => {


const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const { actions } = useContext(Context);

let navigate = useNavigate();

async function handleSubmit(e) {
    e.preventDefault();
    let isLogged = await actions.login(email, password);
    
    if (isLogged) {
      //true
      navigate("/Home");
      
    }else {
      return alert("Incorrect user/password")
    }
  }

  const handleRedirect = () => {
    navigate('/signup');
  };


return (
    <div >
     
    <form
      className="card w-75 mx-auto mb-5"
      onSubmit={handleSubmit}
    >
      <div className="m-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          <h5>Email address</h5>
        </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="m-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
        <h5>Password </h5>
        </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <button type="submit" className="btn btn-warning  mx-auto m-3">
        Enter
      </button>
    </form>
    <h5 className="mt-3 card w-75 mx-auto" style={{ cursor: 'pointer' }}  onClick={handleRedirect}>You haven't account? Click Here to Register!</h5>
    <Footer />
    </div>
  );
};
export default Login;

