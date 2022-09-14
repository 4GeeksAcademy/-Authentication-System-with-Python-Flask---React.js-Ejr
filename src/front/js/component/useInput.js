import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

const useInput = (initialValue) => {
  const { store, actions } = useContext(Context);
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  //   const [longitude, setLongitude] = useState([]);
  //   const [latitude, setLatitude] = useState([]);

  const handleChange = async (event) => {
    setValue(event.target.value);
    if (value.length > 10) {
      try {
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${process.env.MAPBOX_TOKEN}&autocomplete=true`;
        const response = await fetch(endpoint);
        const results = await response.json();
        setSuggestions(results?.features);
        localStorage.setItem("longitude", results?.features[0].center[0]);
        localStorage.setItem("latitude", results?.features[0].center[1]);
        localStorage.setItem("direccion", value);
      } catch (error) {
        console.log("Error fetching data, ", error);
      }
    } else if (value.length == 0) {
      setSuggestions([]);
    }
  };

  return {
    value,
    onChange: handleChange,
    setValue,
    suggestions,
    setSuggestions,
  };
};

export default useInput;
