import React from "react";

export const Footer = () => (
  <footer className="footer mt-auto py-3 text-center bg-dark text-white">
    <div className="container">
      <p className="mb-0">
        Made with <i className="fa fa-heart text-danger"></i> by{" "}
        <a
          href="https://github.com/frankspaceyhelder"
          target="_blank"
          className="text-decoration-none text-white fw-bold"
        >
          Frank Spacey | &nbsp;
        </a>
        <a
          href="https://github.com/StevenSanz"
          target="_blank"
          className="text-decoration-none text-white fw-bold"
        >
          Steven Sanz | &nbsp;
        </a>
        <a
          href="https://github.com/nunezweb"
          target="_blank"
          className="text-decoration-none text-white fw-bold"
        >
          Marlon Núñez
        </a>
      </p>
    </div>
  </footer>
);