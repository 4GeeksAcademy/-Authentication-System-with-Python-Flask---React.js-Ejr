import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Map, { Marker, Popup } from "react-map-gl";
import { Context } from "../store/appContext";

export const MapListings = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyIndex, setPropertyIndex] = useState(null);
  // const [showPopup, setShowPopup] = useState(false);
  const [viewState, setViewState] = React.useState({
    longitude: -3.74922,
    latitude: 40.463667,
    zoom: 6,
  });
  const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

  const handleClick = (property) => {
    setSelectedProperty(property);
  };

  // const handleClose = () => {
  //   setShowPopup(false);
  //   setSelectedProperty(null);
  //   setPropertyIndex(null);
  // };

  return (
    <div>
      <Map
        {...viewState}
        style={{ width: "50vw", height: "80vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        onMove={(e) => setViewState(e.viewState)}
      >
        {" "}
        {store.body_response.map((property, index) => {
          return (
            <Marker
              key={index}
              longitude={property.longitud}
              latitude={property.latitud}
              onClick={() => {
                handleClick(property, index);
              }}
            />
          );
        })}
        {selectedProperty && (
          <Popup
            latitude={selectedProperty.latitud}
            longitude={selectedProperty.longitud}
            anchor="bottom"
            onClose={() => {
              setSelectedProperty(null);
            }}
          >
            <div>
              <p>{selectedProperty.descripcion}</p>
              <a
                className="btn btn-outline-success"
                onClick={() => {
                  localStorage.setItem(
                    "resp_element",
                    JSON.stringify(selectedProperty)
                  );
                  navigate("/single/" + selectedProperty.id);
                }}
              >
                Saber mas
              </a>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};
