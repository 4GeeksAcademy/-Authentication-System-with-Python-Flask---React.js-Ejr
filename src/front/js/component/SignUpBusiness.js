import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const SignUpBusiness = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [business_name, setBusiness_name] = useState("");
  const [nif, setNif] = useState("");
  const [address, setAddress] = useState("");
  const [payment_method, setPayment] = useState("");
  // const [loginError, setLoginError] = useState("");
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      email,
      password,
      business_name,
      nif,
      payment_method, // Assurez-vous d'utiliser la clé correcte pour le paiement
      address,
    };

    let register = await actions.signupBusiness(userData);
    console.log(register);
    if (register) {
      //true
      navigate("/");
    } else {
      // Connexion échouée
      alert("Email already exists");
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="business_name" className="form-label">
            Nombre de la empresa
          </label>
          <input
            type="text"
            className="form-control"
            id="business_name"
            onChange={(e) => setBusiness_name(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Dirección
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nif" className="form-label">
            NIF
          </label>
          <input
            type="text"
            className="form-control"
            id="nif"
            onChange={(e) => setNif(parseInt(e.target.value))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="payment" className="form-label">
            Método de pago
          </label>
          <input
            type="text"
            className="form-control"
            id="payment"
            onChange={(e) => setPayment(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-signupbusiness">
          Crear mi cuenta
        </button>
      </form>
    </div>
  );
};

export default SignUpBusiness;
