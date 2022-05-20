import React from "react";
import { Link } from "react-router-dom";
import { UserHomeList } from "../component/userHomeList";

export const UserHome = () => {
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-12 col-sm-6">
          <select className="form-select mb-2" aria-label="Default select example">
            <option selected="">Ordenar por</option>
            <option value={1}>Valor Mayor</option>
            <option value={2}>Valor Menor</option>
            <option value={3}>Fecha de publicacion</option>
          </select>
        </div>
        <div className="col-12 col-sm-6">
          <Link to="/user_proyects">
            <button type="button" class="btn btn-primary">Ver Postulaciones</button> 
          </Link>
        </div>
      </div>
        <UserHomeList />
  </div>
  );
};
