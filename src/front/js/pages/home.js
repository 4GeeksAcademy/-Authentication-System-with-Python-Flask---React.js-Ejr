import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { useNavigate } from "react-router-dom";
import { CarouselVehicles } from "../component/carouselVehicles";
import { GarageAdvice } from "../component/garageAdvice";
import { Faq } from "../component/faq";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [searchText, setSearchText] = useState("");
  defineElement(lottie.loadAnimation);

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    navigate("/login");
  };

  const displaySearchButton = () => {
    if (searchText !== "") {
      return (
        <button className="btn btn-outline" type="submit">
          <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
          <lord-icon
            src="https://cdn.lordicon.com/msoeawqm.json"
            trigger="hover"
            colors="primary:#3080e8,secondary:#08a88a"
            style={{ width: "30px", height: "30px" }}
            onClick={handleSearch}
          ></lord-icon>
        </button>
      );
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>Vende tu Moto o Coche y desmelénate</h2>
      <div className="container d-flex justify-content-center mt-3">
        <form className="d-flex search-form" role="search">
          <div className="search-wrapper">
            <input
              className="form-control me-2 search-input"
              type="search"
              placeholder="Busca tu coche o moto"
              aria-label="Search"
              value={searchText}
              onChange={handleSearchChange}
            />
            {displaySearchButton()}
          </div>
        </form>
      </div>
      <CarouselVehicles />
      <br></br>
      <br></br>
  
      <GarageAdvice />
      <br></br>
      <Faq />
    </div>
  );
};
