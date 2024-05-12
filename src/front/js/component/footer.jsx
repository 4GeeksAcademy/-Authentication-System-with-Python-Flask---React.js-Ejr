import React, { Component } from "react";
import GitHubLogo from "../../img/github-mark-white.png";
import LinkedinLogo from "../../img/icons8-linkedin-50.png";
import "../../styles/footer.css";

export const Footer = () => (
  <footer className="footer mt-auto py-3 gym-footer">
    <a href="https://github.com/Marinamb19" target="_blank">
      <img src={GitHubLogo} alt="Marina github logo" />
      <span>Marina</span>
    </a>
    <a
      href="https://www.linkedin.com/in/marina-martín-barranco-7a6316247"
      target="_blank"
    >
      <img
        className="linkedin-logo"
        src={LinkedinLogo}
        alt="Marina Linkedin logo"
      />
      <span>Marina</span>
    </a>
    <a href="https://github.com/KevinGaBo" target="_blank">
      <img src={GitHubLogo} alt="Kevin github logo" />
      <span>Kevin</span>
    </a>

    <a href="https://www.linkedin.com/in/kevin-boriosi-61261126b/">
      <img
        className="linkedin-logo"
        src={LinkedinLogo}
        alt="Kevin Linkedin logo"
      />
      <span>Kevin</span>
    </a>
    <a href="https://github.com/JoseJoaquinMartinez" target="_blank">
      <img src={GitHubLogo} alt="Jose Joaquin github logo" />
      <span>José Joaquín</span>
    </a>

    <a
      href="https://www.linkedin.com/in/josé-joaquín-martínez-carrillo-66621a173"
      target="_blank"
    >
      <img
        className="linkedin-logo"
        src={LinkedinLogo}
        alt="Jose Joaquin Linkedin logo"
      />
      <span>José Joaquín</span>
    </a>
  </footer>
);
