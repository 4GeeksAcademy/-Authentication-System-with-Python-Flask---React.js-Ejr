import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";


const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div class="d-flex align-items-center justify-content-center vh-100 bg-primary">
        <div class="text-center">
            <h1 class="display-1 fw-bold text-white">404</h1>
            <p class="text-white">Oops! The page you are looking for does not exist.</p>
            <a onClick={() => navigate("/")} class="btn btn-light">Go Home</a>
        </div>
    </div>
  );
};

export default Error404;