import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/CardBeca.css";

const CardBeca = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
     { store.allScholarships.map((value, index) => {
      return(
        <div className="card">
        <div className="card-body">
        <div className="container">
          <button className="button-area">{value.professional_field}</button>
          <h5 className="card-title">{value.scholarship_name}</h5>
          <p className="card-text"><i className="fa-regular fa-circle-check"/>
            {value.modality}
          </p>
  
          <p className="card-text"><i className="fa-solid fa-location-dot"/>
           {value.institution}
          </p>
          <div className="button-container d-flex">
            <button className="button-aplicar">Aplicar <i class="fa-solid fa-arrow-right" /></button>
          </div>
          </div>
        </div>
      </div>)
      })}
    </>
  );
};

export default CardBeca;
