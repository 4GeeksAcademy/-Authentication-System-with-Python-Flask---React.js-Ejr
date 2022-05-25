import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const UserHomeList = () => {

    const { store, actions } = useContext(Context); 

    

    let lista = store.projects?.map((project, index)=>{
        return (
            <div className="col" key={project.id}>
            <div className="card">
              <img src={project.pictures} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text mb-0"><small className="text-muted">Departamentos en {project.ciudad}</small></p>
                <p className="card-text"><small className="text-muted">{project.address}</small></p>
                <div className="container-fluid p-0">
                  <div className="row">
                    <div className="col-6">
                      <p className="mb-0">Dormitorios: </p>
                      <p className="mb-0">Baños: </p>
                      <p>Superficie desde: </p>
                    </div>
                    <div className="col-6">
                      <p className="mb-0">{project.rooms}</p>
                      <p className="mb-0">{project.bathrooms}</p>
                      <p>{project.size} m<sup>2</sup></p>
                    </div>
                  </div>
                </div>
                <div className="alert alert-secondary" role="alert">Desde UF {project.total_price} - $76.736.480</div>
                <Link to={`/proyect/${project.id}`}>
                  <button type="button" className="btn btn-primary" >Ir al Proyecto</button>
                </Link> 
              </div>
            </div>
          </div>
      )

    })

	return (
        <div className="row row-cols-1 row-cols-md-2 g-4">
            {lista}
        </div>
	);
};
