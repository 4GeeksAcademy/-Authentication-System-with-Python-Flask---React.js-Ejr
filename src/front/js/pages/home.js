import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { } = useContext(Context);

  const [tiempoInicial, setTiempoInicial] = useState({
    horas: 5,
    minutos: 30,
    segundos: 0,
  });
  const [tiempo, setTiempo] = useState(tiempoInicial);

  useEffect(() => {
    const totalSegundosInicial =
      tiempoInicial.horas * 3600 +
      tiempoInicial.minutos * 60 +
      tiempoInicial.segundos;
    let segundosRestantes = totalSegundosInicial;

    const temporizador = setInterval(() => {
      if (segundosRestantes > 0) {
        setTiempo((prevTiempo) => {
          const horas = Math.floor(segundosRestantes / 3600);
          const minutos = Math.floor((segundosRestantes % 3600) / 60);
          const segundos = segundosRestantes % 60;

          segundosRestantes -= 1;

          return {
            horas,
            minutos,
            segundos,
          };
        });
      } else {
        clearInterval(temporizador); // Detener el temporizador cuando llega a cero
      }
    }, 1000);

    return () => clearInterval(temporizador);
  }, [tiempoInicial]);

  return (
    <div className="main-container" style={{ maxHeight: "calc(100vh - 50px)", overflowY: "auto" }}>
      <div className="text-center vh-100">
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "500px" }}
            src="https://dopamina.travel/wp-content/uploads/2019/01/cdmx-portada.jpg"
            alt="Descripción de la imagen"
          />

          {/* Temporizador */}
          <div className="timer-container" style={{ position: "absolute", left: "1500px" }}>
            <div className="timer" style={{ marginBottom: "100px" }}>
              <div className="timer-header" style={{ textAlign: "left", paddingBottom: "5px" }}>
                <span style={{ fontSize: "14px" }}>Finaliza en:</span>
              </div>
              <div className="timer-content">
                <span>{tiempo.horas.toString().padStart(2, "0")}
                  <p style={{ fontSize: "14px" }}>Horas</p>
                </span>
                <span style={{ paddingLeft: "5px" }}>{tiempo.minutos.toString().padStart(2, "0")}
                  <p style={{ fontSize: "14px" }}>Minutos</p>
                </span>
                <span>{tiempo.segundos.toString().padStart(2, "0")}
                  <p style={{ fontSize: "14px" }}>Segundos</p>
                </span>
              </div>
            </div>
          </div>

          <p style={{ fontFamily:"Work Sans", fontSize: "18px", margin: "10px 0", textAlign: "center", color: "white", position: "absolute", bottom: "200px", right: "76%" }}>
            Mirala ahora y obtén 5 puntos!
          </p>

          {/* Botón Ver ahora */}
          <button
            className="boton btn btn-lg btn-custom border-0 mt-3"
            style={{ position: "absolute", bottom: "130px", right: "80%", transform: "translateX(-50%)", display: "flex", alignItems: "center", padding: "15px 20px"}}
          >
            <span style={{ fontSize: "14px", color: "#A259FF" }}>
              <i className="fa-regular fa-eye"></i>
            </span>
            <span className="text-center" style={{ fontSize: "14px", marginLeft: "5px" }}>Ver ahora</span>
          </button>

        </div>
      </div>
    </div>
  );
};
