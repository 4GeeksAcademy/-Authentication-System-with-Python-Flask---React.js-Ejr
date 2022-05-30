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

  //   <div className="container mt-2">
  //     <h3 className="mt-3">Mis Postulaciones</h3>
  //     <div className="row row-cols-1 row-cols-md-2 g-4">
  //       <div className="col">
  //         {!!store.userPostulaciones && store.userPostulaciones.map((project, index) => {
  //           return <div
  //           key={index}
  //           className="card text-white bg-dark col-sm-12"
  //           style={{ width: "18rem" }}
  //         >
  //           <img
              
  //             className="card-img-top proyecto-picture"
  //             alt={store.userPostulaciones[index].projects?.pictures}
  //           />
  //           <div className="card-body">
  //             <h5 className="card-title"></h5>
  //             <p className="card-text"></p>
  //             <p className="card-text">Desde {store.userPostulaciones[index].projects?.size} m2</p>
  //             <p className="card-text">Desde {store.userPostulaciones[index].projects?.minimum_value} UF</p>

  //             <Link to={`/project/${store.userPostulaciones[index].projects?.id}`}>
	// 						<button type="button" className="btn btn-primary">
	// 							Ir al Proyecto
	// 						</button>
	// 					</Link>
  //           </div>
  //         </div>
  //         })}
  //       </div>
        
  //     </div>
  // </div>

  <div className="container">
    <h2 className="mt-4 mb-4 animate__animated animate__fadeIn">Mis Postulaciones</h2>
    <div className="row row-cols-1 row-cols-md-3 g-4">
    {!!store.userPostulaciones && store.userPostulaciones.map((project, index) => {
      return <div className="col" key={index}>
        <div className="card text-white bg-dark animate__animated animate__fadeInRightBig">
          <img src={store.userPostulaciones[index].projects?.pictures} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{store.userPostulaciones[index].projects?.title}</h5>
            <p className="card-text">Desde {store.userPostulaciones[index].projects?.size} m2</p>
            <p className="card-text">Desde {store.userPostulaciones[index].projects?.minimum_value} UF</p>
            <p className="card-text">Habitaciones desde: {store.userPostulaciones[index].projects?.rooms}</p>
            <p className="card-text">Baños desde {store.userPostulaciones[index].projects?.bathrooms}</p>
            <Link to={`/project/${store.userPostulaciones[index].projects?.id}`}>
                <button type="button" className="btn btn-primary">
                    Ir al Proyecto
                </button>
            </Link>
          </div>
        </div>
      </div>
      })}
    </div>
    <div className="container p-0 mt-4 d-flex justify-content-center">
    <Link to={"/user_home"}>
        <button type="button" className="btn btn-primary animate__animated animate__fadeIn animate__delay-2s">
            Volver
        </button>
    </Link>
    </div>
  </div>

  );
};
