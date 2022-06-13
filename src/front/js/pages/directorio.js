import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CardsInflu } from "../component/cardsInfluencers";
import { Search } from "../component/search";

import { Context } from "../store/appContext";

export const Directorio = () => {
    return <div className="container">
        <Search />
        <div className="row my-5">
        <div className="col-3"><CardsInflu/></div>
        <div className="col-3"><CardsInflu/></div>
        <div className="col-3"><CardsInflu/></div>
        <div className="col-3"><CardsInflu/></div>
        </div>
    </div>
}