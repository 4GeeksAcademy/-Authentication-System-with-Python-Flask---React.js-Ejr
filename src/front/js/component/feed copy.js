import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";

export const Feed = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid feed-properties ps-0 pe-2 mb-0">
      {typeof store.body_response === "string" ? (
        <div className="m-5 p-5">
          <h3>{store.body_response}</h3>
        </div>
      ) : Array.isArray(store.body_response) &&
        store.body_response.length == 0 ? (
        <div className="m-5 p-5">
          <h3>No se encontró propiedades, intente una búsqueda distinta</h3>
        </div>
      ) : Array.isArray(store.body_response) &&
        store.body_response.length != 0 ? (
        store.body_response.map((item, index) => (
          <div className="card mb-3" key={index} style="max-width: 540px;">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={item.fotos[0]}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div onClick={() => actions.saveParamSingle(index)}>
                  <Link to={"/single/"}>
                    <h5 className="card-title">
                      {`${item.tipo_vivienda} en ${item.direccion}, ${item.provincia}, ${item.comunidad}`}
                    </h5>
                  </Link>
                </div>
                <div className="card-body">
                  <h2 className="title">{`${item.precio} ${
                    item.tipo_operacion == "alquiler" ? " Euros/mes" : " Euros"
                  }`}</h2>
                  <div className="pe-4">{`Habitaciones: ${item.habitaciones}`}</div>
                  <div className="pe-4">{`Baños: ${item.aseos}`}</div>
                  {item.piscina ? <div className="pe-4">Piscina</div> : ""}
                  {item.terraza ? <div className="pe-4">Terraza</div> : ""}

                  <p className="text">{item.descripcion}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        ""
      )}
    </div>
  );
};

//   className="container d-lg-flex tarjeta rounded-0 border mt-4"
//   key={item.id}
// >
//   <div className="contenedor-foto col-12 col-lg-5 px-0 py-0">
//     <div
//       className="mainFoto px-0"
//       style={{ backgroundImage: `url(${item.fotos[0]})` }}
//     ></div>
//   </div>
//   <div className="contenedor-texto col-12 col-lg-7 p-3">
//     <div onClick={() => actions.saveParamSingle(index)}>
//       <Link to={"/single/"}>
//         <h5 className="title">
//           {`${item.tipo_vivienda} en ${item.direccion}, ${item.provincia}, ${item.comunidad}`}
//         </h5>
//       </Link>
//     </div>
//     <h2 className="title">{`${item.precio} ${
//       item.tipo_operacion == "alquiler" ? " Euros/mes" : " Euros"
//     }`}</h2>
//     <div className="características d-lg-flex wrap justify-content-start pt-4">
//       <div className="pe-4">{`Habitaciones: ${item.habitaciones}`}</div>
//       <div className="pe-4">{`Baños: ${item.aseos}`}</div>
//       {item.piscina ? <div className="pe-4">Piscina</div> : ""}
//       {item.terraza ? <div className="pe-4">Terraza</div> : ""}
//     </div>
//     <div className="pt-4">
//       <p className="text">{item.descripcion}</p>
//     </div>
//   </div>
// </div>
