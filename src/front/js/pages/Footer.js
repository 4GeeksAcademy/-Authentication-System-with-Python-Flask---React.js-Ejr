import React, { Component } from "react";
import "../../styles/Footer.css";

export const Footer = () => (
	<footer className="footer">
  <div className="social-icons">
    <a href="https://github.com/agumanz" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
    <a href="https://github.com/bea-bp" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
    <a href="https://github.com/AugustoSchemberger" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
  </div>
  <p className="copyright">© 2023 Movie Star ★. All rights reserved.</p>
</footer>
);