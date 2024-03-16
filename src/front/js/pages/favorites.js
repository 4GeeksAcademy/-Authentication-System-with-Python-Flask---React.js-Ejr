import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
export default function Favorites() {
  const { store, actions } = useContext(Context);
  const handleFavorites = (item) => {
    if (store.favorites.includes(item)) {
      actions.removeFavorites(item);
    } else {
      actions.addFavorites(item);
    }
  };
  return (
    <div className="d-flex col-10 mx-auto overflow-auto">
      {store.favorites?.map((favorites, index) => (
        <div key={index} className="card" style={{ minWidth: "18rem" }}>
          {/* pass in img from recipe here */}
          {/* <img src="https://ew.com/thmb/kw0Gm2vwP9ChxyHOcMuzw-ddiqI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/EW_StarWars_20-1-6c84c9b72c6941ef9f49f96e4d3f0257.jpg" className="card-img-top" alt="..."/> */}
          <div className="card-body">
            <h5 className="card-title">{favorites.name}</h5>
            {/* here is the pass for the favorite recipe link */}
            {/* <Link to={"charcter_description/" + character.uid} className="btn btn-primary">Learn More</Link> */}
            <button onClick={() => handleFavorites(favorites.name)}>💖</button>
          </div>
        </div>
      ))}
    </div>
  );
}
