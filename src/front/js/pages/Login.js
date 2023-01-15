import { useNavigate } from "react-router-dom";
import { Logo } from "../component/Logo";
import React from "react";
import { useState } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [mostrarrComponente, setMostrarrComponente] = useState(true);
  const [recuperate, setRecuperateComponente] = useState(false);

  return (
    <form className="contenedor-login">
      {mostrarrComponente ? (
        <>
          <div className="mb-3">
            <Logo />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              E-mail{" "}
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div class="mb-3 ">
            <button
              onClick={() => navigate("/biker")}
              type="submit"
              className="btn btn-dark"
            >
              Login Biker
            </button>
            <button
              onClick={() => navigate("/menustore")}
              type="submit"
              className="btn btn-dark"
            >
              Login Store
            </button>
            <button
              onClick={() => {
                setMostrarComponente(true), setMostrarrComponente(false);
              }}
              type="submit"
              className="btn btn-dark"
            >
              Forgot your Password
            </button>
          </div>
        </>
      ) : (
        <></>
      )}

      {recuperate ? (
        <>
          <div class="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />

            <label for="exampleInputPassword1" className="form-label">
              Repeat Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
            <br></br>

            <button
              onClick={() => navigate("/login")}
              type="submit"
              className="btn btn-dark"
            >
              Recuperate
            </button>
          </div>
        </>
      ) : (
        <></>
      )}

      {mostrarComponente ? (
        <>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Entry Your E-mail
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div class="mb-3 ">
            <button
              onClick={() => {
                alert("¡email enviado!"),
                  setMostrarComponente(false),
                  setRecuperateComponente(true);
              }}
              type="submit"
              className="btn btn-dark"
            >
              Send E-mail
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </form>
  );
};
