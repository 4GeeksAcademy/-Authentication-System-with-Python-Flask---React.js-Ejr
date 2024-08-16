import React from "react";
import Searchbar from "./searchbar.jsx";
import "../../styles/jumbotron.css";
import { Link } from "react-router-dom";

export const Jumbotron = () => {
  return (
    <div className="p-2 mb-4 jumbotron">
      <div className="container-xxl">
      <h1 className="display-sm-2 display-md-5 fw-bold ps-0">
          Tu próxima aventura
          <br/>
          <span>comienza con las mejores rutas.</span>
        </h1>
      </div>
    </div>
  );
};
