import React, { useState } from "react";
import "../../styles/registerUser.css";
import catImage from "../../img/Rectangle 14.png";

const URL =
  "https://3001-dihero86-proyectofinalp-ucn1wwww0dq.ws-eu95.gitpod.io/";

const RegisterUser = () => {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  const addNewUser = async () => {
    try {
      await fetch(URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      //inputGroup.value = "";
    } catch (err) {
      console.log("err");
    }
  };

  return (
    <div className="container-fluid">
      <div className="col-md-8">
        <h1 className="title">Regístrate y empieza a adoptar</h1>
        <form>
          <div class="mb-3">
            <label for="inputName" class="form-label">
              Nombre
            </label>
            <input
              type="text"
              class="form-control"
              id="inputName"
              name="name"
              required
            ></input>
          </div>
          <div class="mb-3">
            <label for="inputLastName" class="form-label">
              Apellidos
            </label>
            <input
              type="text"
              class="form-control"
              id="inputLastName"
              name="lastName"
              required
            ></input>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              name="email"
              aria-describedby="emailHelp"
              required
            ></input>
          </div>
          <div id="emailHelp" class="form-text">
            No compartiremos su email con terceros.
          </div>
          <div class="mb-3">
            <label for="inputPassword1" class="form-label">
              Contraseña
            </label>
            <input
              type="password"
              class="form-control"
              id="inputPassword1"
              name="password"
              aria-describedby="passwordHelp"
              required
            ></input>
          </div>
          <div id="passwordHelp" class="form-text">
            Escriba una contraseña con al menos 6 caracteres.
          </div>
          <div class="mb-3">
            <label for="inputPassword2" class="form-label">
              Repetir contraseña
            </label>
            <input
              type="password"
              class="form-control"
              id="inputPassword2"
              name="passwordCheck"
              aria-describedby="passwordCheckHelp"
              required
            ></input>
          </div>
          <div id="passwordCheckHelp" class="form-text">
            Ambas contraseñas deben coincidir.
          </div>
          <div>
            <button
              className="btn"
              type="submit"
              style={{ backgroundColor: "#42A0BD" }}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      <div className="col-md-4">
        <div className="imagen">
          <img src={catImage} className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
