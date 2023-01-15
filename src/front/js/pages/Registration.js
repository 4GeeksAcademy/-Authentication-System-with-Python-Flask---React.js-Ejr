import { useState } from "react";

import { useNavigate } from "react-router-dom";
import React from "react";

export const Registration = () => {
  const navigate = useNavigate();

  const [mostrarComponente, setMostrarComponente] = useState(true);

  return (
    <form className="contenedor-login">
      <div className="mb-3">
        <button
          onClick={() => setMostrarComponente(true)}
          type="button"
          className="btn btn-dark"
        >
          workshop
        </button>
        <button
          onClick={() => setMostrarComponente(false)}
          type="button"
          className="btn btn-dark"
        >
          biker
        </button>
      </div>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Name
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />

        <label for="exampleInputEmail1" className="form-label">
          Last-Name
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />

        <label for="exampleInputEmail1" className="form-label">
          E-mail{" "}
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />

        <label for="exampleInputEmail1" className="form-label">
          Pasword
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />

        <label for="exampleInputEmail1" className="form-label">
          Repeat Password
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />

        <label for="exampleInputEmail1" className="form-label">
          Addressn
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />

        {mostrarComponente ? (
          <>
            <label for="exampleInputEmail1" className="form-label">
              horario
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1elim"
              aria-describedby="emailHelp"
            />
          </>
        ) : (
          <></>
        )}
      </div>
      <button
        onClick={() => navigate("/login")}
        type="submit"
        className="btn btn-dark"
      >
        Create Acount
      </button>
    </form>
  );
};
