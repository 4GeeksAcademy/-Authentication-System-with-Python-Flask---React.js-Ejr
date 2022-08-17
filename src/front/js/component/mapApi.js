import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Source,
  Layer,
} from "react-map-gl";

const MapApi = () => {
  const mapstyle = {
    width: "100%",
    height: "500px",
    borderRadius: "15px",
  };

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [275.3, 10] },
      },
    ],
  };

  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };

  const accessToken =
    "pk.eyJ1IjoiZXRvbG9wZXoiLCJhIjoiY2w2d3g4M2cwMGM4NTNkcGJkNnNjZHRoNSJ9.SSJeRcj-upXlkWgXBtzWAw";

  return (
    <div>
      <Map
        mapboxAccessToken={accessToken}
        style={mapstyle}
        initialViewState={{ longitude: 275.3, latitude: 10, zoom: 7 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker longitude={276} latitude={10} />

        <NavigationControl />
        <FullscreenControl />
        <GeolocateControl />
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </div>
  );
};

export default MapApi;
