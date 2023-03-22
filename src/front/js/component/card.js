import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import rigo from "../../img/rigo-baby.jpg"

export default function Card(){
    return<>
        <div className="card ms-2 mb-2">
            <img src={rigo} style={{"width": "200px"}}/>
        </div>
    </>
}