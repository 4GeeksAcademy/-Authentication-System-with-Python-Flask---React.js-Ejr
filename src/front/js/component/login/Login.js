import React, {  useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Context } from "../../store/appContext";

const Login = () => {

  const {store, actions} = useContext(Context)

  return (
    <div className="container bg-dark my-5">

    <form className="row g-3">
  <div className="col-auto">
    <label htmlFor="staticEmail2" className="visually-hidden">
      Email
    </label>
    <input
      type="text"
      readOnly=""
      className="form-control"
      id="staticEmail2"
      defaultValue="email@example.com"
    />
  </div>
  <div className="col-auto">
    <label htmlFor="inputPassword2" className="visually-hidden">
      Password
    </label>
    <input
      type="password"
      className="form-control"
      id="inputPassword2"
      placeholder="Password"
    />
  </div>
  <div className="col-auto">
    <button type="submit" className="btn btn-primary mb-3">
      Iniciar Sesión
    </button>
  </div>
</form>
</div>

  )
}

export default Login