import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Context } from "../../store/appContext";

const Login = () => {

  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    // Este efecto se ejecutará cada vez que 'currentUser' cambie.
    // Puedes realizar acciones relacionadas con 'currentUser' aquí.
    console.log("currentUser ha cambiado:", store.currentUser);
  }, [store.currentUser]); // Agrega 'store.currentUser' como dependencia

  


  const manejoLogin = (e) => {
    e.preventDefault();
    actions.entrada({ email: store.email, password: store.password });
  }

  return (
    <div className="container my-5">
      {
        !!store.currentUser ? (
          <>
            <h1><strong>Bienvenido:</strong></h1>
            <h1>{store.currentUser.user.email}</h1>
          </>
        ) : (
          <form className="row g-3" onSubmit={manejoLogin} >
            <div className="col-auto">
              <label htmlFor="inputEmail" className="visually-hidden">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                name="email"
                placeholder="Email"
                required
                value={store.email}
                onChange={e => actions.setEmail(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <label htmlFor="inputPassword" className="visually-hidden">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                name="password"
                placeholder="Password"
                required
                value={store.password}
                onChange={e => actions.setPassword(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">
                Iniciar Sesión
              </button>
            </div>
          </form>
        )
      }
    </div>

  )
}

export default Login