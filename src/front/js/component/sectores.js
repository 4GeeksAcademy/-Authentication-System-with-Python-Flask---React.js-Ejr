import React from "react";
import "../../styles/home.css";

export const Sectores = () => {
  return (
    <div style={{ backgroundColor: "#fbd63d" }}>
      <div class="container" style={{ backgroundColor: "#fbd63d" }}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h4 className="antetitulo4">¿A QUÉ SE DEDICA TU EMPRESA?</h4>
        <h1 className="text-center pb-2 tituloabout">
          <b>LLEGAMOS A TODOS LOS SECTORES </b>
        </h1>
        <br></br>
        <br></br>

        <div class="row">
          <div class="col">
            <div className="card" style={{ width: 300 }}>
              <img
                classname="card-img-top"
                src="https://i.ibb.co/cv71NDF/Disen-o-sin-ti-tulo-2.png"
                alt="Card image cap"
                style={{ width: 300, height: 400 }}
              />
            </div>
            <p className="sectores">Moda</p>
          </div>
          <div class="col">
            <div className="card" style={{ width: 300 }}>
              <img
                classname="card-img-top"
                src="https://i.ibb.co/n6hJ9xv/Disen-o-sin-ti-tulo-5.png"
                alt="Card image cap"
                style={{ width: 300, height: 400 }}
              />
            </div>
            <p className="sectores">Mamá y premamá</p>
          </div>
          <div class="col">
            <div className="card" style={{ width: 300 }}>
              <img
                classname="card-img-top"
                src="https://i.ibb.co/K9D73Qn/Disen-o-sin-ti-tulo-4.png"
                alt="Card image cap"
                style={{ width: 300, height: 400 }}
              />
            </div>
            <p className="sectores">Fitness y salud</p>
          </div>
          <div class="col">
            <div className="card" style={{ width: 300 }}>
              <img
                classname="card-img-top"
                src="https://i.ibb.co/vhP5Y4c/Disen-o-sin-ti-tulo-3.png"
                alt="Card image cap"
                style={{ width: 300, height: 400 }}
              />
            </div>
            <p className="sectores">Automoción</p>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};
