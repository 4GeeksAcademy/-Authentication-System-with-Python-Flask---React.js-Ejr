import React, { useContext, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { Context } from "../store/appContext";

export const MapListings = () => {
  const { store, actions } = useContext(Context);
  const [viewState, setViewState] = React.useState({
    longitude: -3.74922,
    latitude: 40.463667,
    zoom: 5,
  });
  const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

  return (
    <div>
      <Map
        {...viewState}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        onMove={(e) => setViewState(e.viewState)}
      ></Map>
    </div>
  );
};
