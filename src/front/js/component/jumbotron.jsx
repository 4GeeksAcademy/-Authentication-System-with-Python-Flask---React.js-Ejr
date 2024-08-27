import React from "react";
import Searchbar from "./searchbar.jsx";
import "../../styles/jumbotron.css";
import { Link } from "react-router-dom";

export const Jumbotron = () => {
  return (
    <div className="mb-4 jumbotron">
      <div>
        <div id="carouselExampleSlidesOnly" className="container-fluid carousel jumbo-slider slide p-0" data-bs-ride="carousel">
          <div className="carousel-inner jumbo-slider">
            <div className="carousel-item jumbo-slider active">
              <img src="https://images.unsplash.com/photo-1468183654773-77e2f0bb6bf9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 jumbo-slider" alt="..."/>
            </div>
            <div className="carousel-item jumbo-slider">
              <img src="https://images.unsplash.com/photo-1495562569060-2eec283d3391?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 jumbo-slider" alt="..."/>
            </div>
            <div className="carousel-item jumbo-slider">
              <img src="https://images.unsplash.com/photo-1437652633673-cc02b9c67a1b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 jumbo-slider" alt="..."/>
            </div>
          </div>
        </div>
        <h1 className="fw-bold ps-0">
            Tu próxima aventura
            <br/>
            <span>comienza con las mejores rutas.</span>
        </h1>
      </div>
    </div>
  );
};