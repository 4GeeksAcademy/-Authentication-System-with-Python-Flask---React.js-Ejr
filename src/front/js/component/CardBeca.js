import React from 'react'
import "../../styles/CardBeca.css";

const CardBeca = () => {
  return (
    <div>
<div className="card">
      <div className="card-body">
      <div className="container">
        <button className="button-area">Ciencia</button>
        <h5 className="card-title">Maestría en Ingeniería de Alimentos</h5>
        <p className="card-text"><i className="fa-regular fa-circle-check"/>
          Beca Completa
        </p>

        <p className="card-text"><i className="fa-solid fa-location-dot"/>
          Universidad de Madrid
        </p>
        <div className="button-container">
          <button className="button-aplicar">Aplicar <i class="fa-solid fa-arrow-right" /></button>
        </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CardBeca