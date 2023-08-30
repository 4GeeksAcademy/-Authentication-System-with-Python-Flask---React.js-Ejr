import React from "react";

export const Footer = () => (
  <nav
    className="navbar fixed-bottom navbar"
    style={{ backgroundColor: "#161C28" }}
  >
    <div className="col-7 ms-5 my-4">
      <h1 style={{ color: "#FD862C" }}>Bexplora</h1>
      <h6 style={{ color: "#A6A6A6", marginBottom: "2rem" }}>
        Mejorando tu futuro
      </h6>
      <h6 style={{ color: "#FFFFFF" }}>
        © 2023 Bexplora. Nos reservamos los derechos de autor.
      </h6>
    </div>
    <div className="col-3 d-flex justify-content-end me-5">
      <img
        src="https://i.imgur.com/J6XQNp5.png"
        alt="Logo Bexplora"
        style={{ width: "100px", height: "auto" }}
      />
    </div>
  </nav>
);
