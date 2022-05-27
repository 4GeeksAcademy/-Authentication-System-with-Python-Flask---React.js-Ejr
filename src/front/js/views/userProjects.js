import React, {useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const UserProjects = () => {
  const {store, actions} = useContext(Context)
  useEffect(() =>{
    console.log(store.currentUser)
  }, [])
  useEffect(() =>{
    
    actions.getPostulacionesByUser(store.currentUser?.id)
    console.log(store.userPostulaciones)
  }, [store.currentUser])

  return (

    <div className="container mt-2">
      <h3 className="mt-3">Mis Postulaciones</h3>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          {!!store.userPostulaciones && store.userPostulaciones.map(() => {
            return <div
            className="card text-white bg-dark col-sm-12"
            style={{ width: "18rem" }}
          >
            <img
              
              className="card-img-top proyecto-picture"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title"></h5>
              <p className="card-text"></p>
              <p className="card-text">Desde m2</p>
              <p className="card-text">Desde  UF</p>

              <Link to={`/company_dashboard/project/`}>
                <button type="button" className="btn btn-primary">
                  Ver Mas
                </button>
              </Link>
            </div>
          </div>
          })}
        </div>
        
      </div>
  </div>

  );
};
