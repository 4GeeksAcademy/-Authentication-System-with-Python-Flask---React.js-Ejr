import React, { useContext } from "react";
// import Map, { Marker } from "react-map-gl";
import { AddressInput } from "./addressInput";
import { Context } from "../store/appContext";

export const MapListings = () => {
  const { store, actions } = useContext(Context);
  const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

  return (
    <>
      <AddressInput />
      {/* <Map
        initialViewState={{
          latitude: store.latitude,
          longitude: store.longitude,
          zoom: 14,
        }}
        style={{ width: 800, height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker
          longitude={store.longitude}
          latitude={store.latitude}
          color="red"
        />
      </Map> */}
    </>
  );
};
