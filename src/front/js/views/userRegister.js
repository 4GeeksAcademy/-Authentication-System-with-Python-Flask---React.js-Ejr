import React from "react";
import "../../styles/login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
export const UserRegister = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [salary, setSalary] = useState(0);
  const [side_income, setSideIncome] = useState(0);
  const [deudas, setDeudas] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {};
    data.name = name;
    data.lastname = lastName;
    data.salary = salary;
    data.side_income = side_income;
    data.deudas = deudas;
    data.email = email;
    data.password = password;

    const info = await registerFetch(data);
    console.log(info);
    setName("");
    setLastName("");
    setSalary(0);
    setSideIncome(0);
    setDeudas(0);
    setEmail("");
    setPassword("");
  };

  const registerFetch = async (data) => {
    const resp = await fetch(
      "https://3001-xetnal-finalproject-kainuymmez4.ws-us46.gitpod.io/api/register",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/JSON" },
      }
    );
    const info = await resp.json();
    return info;
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label>Nombre</label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            class="form-control"
            id="InputNombre"
            aria-describedby="emailHelp"
            placeholder="Ingresa tu nombre"
          />
          <label>Apellido</label>
          <input
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            class="form-control"
            id="apellido"
            aria-describedby="emailHelp"
            placeholder="Ingresa tu apellido"
          />
          <label>Sueldo</label>
          <input
            name="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            type="number"
            class="form-control"
            id="InputSueldo"
            aria-describedby="emailHelp"
            placeholder="Ingresa tu Sueldo"
          />
          <label>Sueldo complementario</label>
          <input
            name="sideIncome"
            value={side_income}
            onChange={(e) => setSideIncome(e.target.value)}
            type="number"
            class="form-control"
            id="InputSueldoComplementario"
            aria-describedby="emailHelp"
            placeholder="Ingresa tu Sueldo complementario"
          />
          <label>Deudas</label>
          <input
            name="deudas"
            value={deudas}
            onChange={(e) => setDeudas(e.target.value)}
            type="number"
            class="form-control"
            id="InputDeudas"
            aria-describedby="emailHelp"
            placeholder="Ingresa el monto total de tus deudas"
          />
          <label>Email</label>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            class="form-control"
            id="InputEmail1"
            aria-describedby="emailHelp"
            placeholder="Ingresa tu email"
          />
          <small id="emailHelp" class="form-text text-muted">
            Nunca compartiremos tu Email con nadie.
          </small>
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            class="form-control"
            id="InputPassword1"
            placeholder="Ingresa tu contraseña"
          />
          {/* <label>Confirma tu Contraseña</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            class="form-control"
            id="InputPassword2"
            placeholder="Reingresa tu contraseña"
          /> */}
        </div>

        <button type="submit" className="btn btn-dark my-3">
          Register
        </button>
      </form>
    </div>
  );
};
