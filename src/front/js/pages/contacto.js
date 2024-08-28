import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/contacto.css";
import mapa from '../../img/direccionDeMadrid.png';

function Contacto() {
    return (
    <div className='Titulo'>
      <h5 className='Titulo-principal'>Información de Contacto</h5>
      <div className='contacto'>
      <div className='contacto__main-content'>
        <div className="card mb-5">
        <img src={mapa} className="card-img-top"/>
      <div className="card-body">
      <h5 class="card-title">Plaza España 123</h5>
          <p>Piso 5to Puerta 3</p>
          <p>Codigo Postal 09876</p>
          <p>Madrid- España </p>
          <p>Teléfono de Contacto: 612345678</p>
          <p>Email: Learning@network.com</p>
      </div>
      </div>
      </div>
      </div>













</div>
  );
}




export default Contacto;