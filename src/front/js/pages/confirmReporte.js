import React from "react";
import Logo from "../../img/logo.png";
const ConfirmReporte = () => {
  return (
    <div className="container mt-5">
      <div className="row mt-5 mb-5">
        <div className="col text-center">
          <br />
          <br />
          <br />
          <br />
          <br />
          <h6>
            Gracias por informarnos sobre este problema, Nos comunicaremos
            contigo lo antes posible por medio de tu email o número telefónico.
          </h6>

          <h6> Nos alegra que seas parte de Casino Corporativo</h6>
          <div className="w-50 mx-auto d-block">
            <img className="mt-5" src={Logo} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ConfirmReporte;
