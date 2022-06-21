import React, { Component } from "react";

export const Footer = () => {
  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <div className="container" style={{ backgroundColor: "#f5f5f5" }}>
        <section class="d-flex justify-content-between p-4 text-dark">
          <div class="me-5">
            <img
              src="https://i.ibb.co/X8KB9ZY/Influe-re.png"
              className="img-fluid shadow-4"
              alt="..."
            />
          </div>

          <div className="redessociales">
            <a href="" class="text-dark me-4">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="" class="text-dark me-4">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="" class="text-dark me-4">
              <i class="fab fa-google"></i>
            </a>
            <a href="" class="text-dark me-4">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="" class="text-dark me-4">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="" class="text-dark me-4">
              <i class="fab fa-github"></i>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
