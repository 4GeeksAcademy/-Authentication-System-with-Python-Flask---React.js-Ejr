import React, { useState, useEffect, useContext } from "react"; // Importación de React y algunos hooks
import { Link } from "react-router-dom"; // Importación de Link para la navegación
import { Context } from "../store/appContext"; // Importación del contexto
import styles from "./Plans.module.css"; // Importación de estilos CSS


const Plans = () => {
  return (
    <div className={styles.container}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className={styles["text-uppercase"]}>Planes</h2>
            <p className="crossfy-texto-home">
              Sin límite de permanencia. Descuentos por pagos semestrales y
              anuales. Período de prueba gratuito y sin compromiso!
            </p>
          </div>
        </div>
        <ul className="nav nav-pills nav-fill" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="latam-tab"
              data-bs-toggle="tab"
              href="#latam"
              role="tab"
              aria-controls="latam"
              aria-selected="true"
            >
              LATAM
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="argentina-tab"
              data-bs-toggle="tab"
              href="#argentina"
              role="tab"
              aria-controls="argentina"
              aria-selected="false"
            >
              Otros Paises
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="latam"
            role="tabpanel"
            aria-labelledby="latam-tab"
          >
            <div className="row">

            <div className="col-lg-4 mb-4">
                <div className="price-box">
                  <div className="price-header">
                    <h3 className="text-uppercase">Mensual</h3>
                    <h4 className="precio-home">$00</h4>
                    <p className="text-uppercase">Pago mensual</p>
                  </div>
                  <ul className="list-unstyled price-features">
                    <li>Precio expresado en U$S</li>
                    <li>Sin costo de lanzamiento</li>
                    <li>Sin límites de atletas</li>
                    <li>Diseño incluído</li>
                    <li>Soporte directo</li>
                  </ul>
                  <div className="price-footer">
                    <a
                      className="btn btn-primary btn-xl btn-rounded"
                      href=""
                    >
                      <i className="fa-brands fa-whatsapp"></i> lo quiero!
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4">
                <div className="price-box">
                  <div className="price-header">
                    <h3 className="text-uppercase">Semestral</h3>
                    <h4 className="precio-home">$00</h4>
                    <p className="text-uppercase">Un único pago de $000</p>
                  </div>
                  <ul className="list-unstyled price-features">
                    <li>Precio expresado en U$S</li>
                    <li>Sin costo de lanzamiento</li>
                    <li>Sin límites de atletas</li>
                    <li>Diseño incluído</li>
                    <li>Soporte directo</li>
                  </ul>
                  <div className="price-footer">
                    <a
                      className="btn btn-primary btn-xl btn-rounded"
                      href=""
                    >
                      <i className="fa-brands fa-whatsapp"></i> lo quiero!
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 mb-4">
                <div className="price-box best-plan text-white">
                  <div className="price-header">
                    <h3 className="text-uppercase">Anual</h3>
                    <h4 className="precio-home">$00</h4>
                    <p className="text-uppercase">Un único pago de $000</p>
                  </div>
                  <ul className="list-unstyled price-features">
                    <li>Precio expresado en U$S</li>
                    <li>Sin costo de lanzamiento</li>
                    <li>Sin límites de atletas</li>
                    <li>Diseño incluído</li>
                    <li>Soporte directo</li>
                  </ul>
                  <div className="price-footer">
                    <a
                      className="btn btn-light btn-xl btn-rounded"
                      href=""
                    >
                      <i className="fa-brands fa-whatsapp"></i> lo quiero!
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div
            className="tab-pane fade"
            id="argentina"
            role="tabpanel"
            aria-labelledby="argentina-tab"
          >
            <div className="row">

            <div className="col-lg-4 mb-4">
                <div className="price-box">
                  <div className="price-header">
                    <h3 className="text-uppercase">Mensual</h3>
                    <h4 className="precio-home">$000</h4>
                    <p className="text-uppercase">$000 Pago mensual</p>
                    <p className="text-uppercase">(IVA incluído)</p>
                  </div>
                  <ul className="list-unstyled price-features">
                    <li>Precio expresado en $Moneda</li>
                    <li>Sin costo de lanzamiento</li>
                    <li>Sin límites de atletas</li>
                    <li>Diseño incluído</li>
                    <li>Soporte directo</li>
                    <li>Listo para usar en cuestión de horas</li>
                  </ul>
                  <div className="price-footer">
                    <a
                      className="btn btn-primary btn-xl btn-rounded"
                      href=""
                    >
                      <i className="fa-brands fa-whatsapp"></i> lo quiero!
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4">
                <div className="price-box">
                  <div className="price-header">
                    <h3 className="text-uppercase">Semestral</h3>
                    <h4 className="precio-home">$00</h4>
                    <p className="text-uppercase">Un único pago de $00.000</p>
                    <p className="text-uppercase">(IVA incluído)</p>
                  </div>
                  <ul className="list-unstyled price-features">
                    <li>Precio expresado en $Moneda</li>
                    <li>Sin costo de lanzamiento</li>
                    <li>Sin límites de atletas</li>
                    <li>Diseño incluído</li>
                    <li>Soporte directo</li>
                    <li>Listo para usar en cuestión de horas</li>
                  </ul>
                  <div className="price-footer">
                    <a
                      className="btn btn-primary btn-xl btn-rounded"
                      href=""
                    >
                      <i className="fa-brands fa-whatsapp"></i> lo quiero!
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 mb-4">
                <div className="price-box best-plan text-white">
                  <div className="price-header">
                    <h3 className="text-uppercase">Anual</h3>
                    <h4 className="precio-home">$000</h4>
                    <p className="text-uppercase">Un único pago de $00.000</p>
                    <p className="text-uppercase">(IVA incluído)</p>
                  </div>
                  <ul className="list-unstyled price-features">
                    <li>Precio expresado en $Moneda</li>
                    <li>Sin costo de lanzamiento</li>
                    <li>Sin límites de atletas</li>
                    <li>Diseño incluído</li>
                    <li>Soporte directo</li>
                    <li>Listo para usar en cuestión de horas</li>
                  </ul>
                  <div className="price-footer">
                    <a
                      className="btn btn-light btn-xl btn-rounded"
                      href=""
                    >
                      <i className="fa-brands fa-whatsapp"></i> lo quiero!
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;