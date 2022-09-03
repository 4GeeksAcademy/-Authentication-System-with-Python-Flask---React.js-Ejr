import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import { Aside } from "../component/aside";
import { Tablero } from "../component/tablero";

export const Dashboard = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.syncLocalStorageToStore();
    console.log("los datos del store han sido restituidos");
  }, []);

  return (
    <div className="dashboard-contenedor container d-flex px-0">
      {/* lateral de filtros */}
      <Aside />
      {/* tablero de resultados */}
      <Tablero />
    </div>
  );
};
