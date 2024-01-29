import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import { useParams } from "react-router-dom";

export const PagesPeliculas = () => {

  const [detallePelicula, setDetallePelicula] = useState([]);
  {/*const params = useParams()
  
  function obtenerInfoDeUnaPelicula() {
    fetch("VA LA API DE PELICULAS" + params.theid)
      .then((res) => res.json())
      .then((data) => setDetallePersonaje(data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    obtenerInfoDeUnaPelicula()
  }, [])*/}

  return (
    <div>
      <div className="card mb-5 vh-100" style={{ height: "800px", backgroundColor: "transparent", maxWidth: "800px", margin: "0 auto", border: "none" }} >
        <div className="row g-0">
          <div className="col-md container text-center" >
            <img
              src={"https://images.pexels.com/photos/4065578/pexels-photo-4065578.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
              style={{ width: "100%", height: "30%" }}
              className="img-fluid mx-auto my-auto"
              alt="..."
            />
            <div className="container" style={{ backgroundColor: "transparent", height: "800px", width: "700px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <h1 className="card-title" style={{ marginTop: "10px", color: "white", fontFamily:"Work Sans" }}>NOMBRE PELÍCULA {detallePelicula.name}</h1>
              <span className="card-text" style={{ color: "#858584", fontSize: "small", fontFamily:"Body Text, Work Sans" }}>FECHA Sep 30, 2022{detallePelicula.fecha}</span>

              <p className="card-text" style={{ marginTop: "20px", marginBottom: "0" }}>
                Creadores o Productores
              </p>
              <p className="text-light" style={{fontFamily:"Work Sans"}}>{detallePelicula.creador} Orbitian</p>
              <p className="card-text" style={{ marginTop: "20px", marginBottom: "0" }}>Descripción</p>
              <p className="text-light" style={{fontFamily:"Work Sans"}}>{detallePelicula.descripacion} The Orbitians
                They live in a metal space machines, high up in the sky and only have one foot on Earth.
                These Orbitians are a peaceful race, but they have been at war with a group of invaders for many generations. The invaders are called Upside-Downs, because of their inverted bodies that live on the ground, yet do not know any other way to be. Upside-Downs believe that they will be able to win this war if they could only get an eye into Orbitian territory, so they've taken to make human beings their target.
                </p>
              <p className="card-text" style={{ marginTop: "20px", marginBottom: "0" }}>Plataformas</p>
              <p className="text-light" style={{ marginBottom: "5px", fontFamily:"Work Sans" }}><i class="fa-solid fa-globe" style={{ color: "#858584", marginRight: "5px" }}></i> Netflix</p>
              <p className="text-light" style={{ marginBottom: "0" }}><i class="fa-solid fa-globe" style={{ color: "#858584", marginRight: "5px" }}></i> HBO max</p>
              <p className="card-text" style={{ marginTop: "20px", marginBottom: "5px", fontFamily:"Work Sans" }}>Tags</p>
              <div className="d-flex">
                <div class="rounded-container"  style={{marginRight:"10px"}} >
                  <div class="rounded-content text-light" style={{fontFamily:"Work Sans"}}>
                    TERROR
                  </div>
                </div>
                <div class="rounded-container"  style={{marginRight:"10px"}}>
                  <div class="rounded-content text-light" style={{fontFamily:"Work Sans"}}>
                    SUSPENSO
                  </div>
                </div>
                <div class="rounded-container"  style={{marginRight:"10px"}}>
                  <div class="rounded-content text-light" style={{fontFamily:"Work Sans"}}>
                    TERROR
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}