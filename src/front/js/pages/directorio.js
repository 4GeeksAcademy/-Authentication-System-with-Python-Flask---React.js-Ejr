import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CardsInflu } from "../component/cardsInfluencers";
import { Search } from "../component/search";
import { Calltoaction } from "../component/calltoaction";
import { Context } from "../store/appContext";
import { Headerdirectorio } from "../component/headerdirectorio";

export const Directorio = () => {
  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <Headerdirectorio />
      <div className="container">
        <Search />
        <div className="row my-5">
          <div className="col-3">
            <CardsInflu />
          </div>
          <div className="col-3">
            <CardsInflu />
          </div>
          <div className="col-3">
            <CardsInflu />
          </div>
          <div className="col-3">
            <CardsInflu />
          </div>
        </div>
      </div>
      <Calltoaction />
    </div>
  );
};
