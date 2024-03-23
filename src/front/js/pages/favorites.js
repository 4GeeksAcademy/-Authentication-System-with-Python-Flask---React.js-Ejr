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
          <div className="card-body">
            <h5 className="card-title">{favorites.name}</h5>
            <button onClick={() => handleFavorites(favorites.name)}>💖</button>
          </div>
        </div>
      ))}
    </div>
  );
}
