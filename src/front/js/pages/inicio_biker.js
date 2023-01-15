import { useNavigate } from "react-router-dom";
import React from "react";
import { Logo } from "../component/Logo";

export const Biker = () => {
  const navigate = useNavigate();
  return (
    <form className="contenedor-login">
      <div className="mb-3">
        <Logo />
      </div>
     
      
          <button
            onClick={() => navigate("/userstore")}
            type="submit"
            className="btn btn-dark"
          >
            Ws_Store
          </button>
        <div className="mb-3">
          <button
            onClick={() => alert("proximamente")}
            type="submit"
            className="btn btn-dark"
          >
            Travel
          </button>

          <button
            onClick={() => alert("proximamente")}
            type="submit"
            className="btn btn-danger"
          >
            S.O.S
          </button>
        </div>
     
    </form>
  );
};
