import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { Aside } from "../component/aside";
import { Tablero } from "../component/tablero";

export const Dashboard = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="dashboard-contenedor container d-lg-flex px-0">
      {/* lateral de filtros */}
      <Aside />
      {/* tablero de resultados */}
      <Tablero />
    </div>
  );
};
