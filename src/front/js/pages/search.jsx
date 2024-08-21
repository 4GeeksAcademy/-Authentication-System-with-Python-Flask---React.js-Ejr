import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/search.css";
import { RouteCard } from "../component/searchRouteCard.jsx";
import { Navbarsearch } from "../component/navbar-search.jsx";
import { LoginRegister } from "../component/registerModal.jsx";

export const Search = () => {
  const { store, actions } = useContext(Context);

  return (
    <main>
      {/* <Navbarsearch /> */}
      <LoginRegister />
      <h6 className="mt-5 mb-3 founded">
        Se han encontrado <b>{store.itineraries.length}</b> itinerarios:
      </h6>
      <div className="row justify-content-center mb-4 gx-0 p-4">
        {store.itineraries && store.itineraries.length > 0 ? (
          store.itineraries.map((itinerary, index) => (
            <div
              className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center mb-4 gx-3"
              key={index}
            >
              <RouteCard
                id={index}
                title={itinerary.title}
                img={itinerary.images.img[0]}
                desc={itinerary.description}
                score={itinerary.score}
              />
            </div>
          ))
        ) : (
          <h1>No se ha encontrado ninguna ruta</h1>
        )}
      </div>
    </main>
  );
};
