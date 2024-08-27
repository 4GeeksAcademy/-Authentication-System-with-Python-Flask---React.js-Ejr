import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import "../../styles/inputRutas.css";

export const InputRutas = () => {
  const { store, actions } = useContext(Context);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [cityValue, setCityValue] = useState(""); // Nueva variable de estado para la ciudad
  const cityInputRef = useRef(null); // Ref para el input de la ciudad

  const predefinedTags = [
    "Rutas de senderismo",
    "Viajes en coche",
    "Playas",
    "Rutas gastronómicas",
    "Caminos de Santiago",
    "Escapadas de fin de semana",
    "Montañas",
    "Pueblos con encanto",
    "Patrimonio de la Humanidad",
    "Fiestas y tradiciones",
    "Turismo rural",
    "Destinos históricos",
  ];

  useEffect(() => {
    if (window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        cityInputRef.current,
        {
          types: ["(cities)"],
          componentRestrictions: { country: "es" }, // Restricción para España
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setCityValue(place.name); // Establece el valor de la ciudad seleccionada
      });
    }
  }, []);

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleInputTitleChange = (e) => {
    setTitleValue(e.target.value);
    store.newItineraryData.title = e.target.value;
  };

  const handleInputDescChange = (e) => {
    setDescriptionValue(e.target.value);
    store.newItineraryData.description = e.target.value;
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCityChange = (e) => {
    setCityValue(e.target.value);
  };

  const handleSelectTag = (tag) => {
    addTag(tag);
    setInputValue(""); // Limpiar el valor del input después de seleccionar un tag
  };

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  return (
    <div>
      <hr />
      <h5 className="mb-2">Información del itinerario:</h5>

      {/* Input para la ciudad con autocompletado */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Ciudad"
          aria-label="Ciudad"
          aria-describedby="basic-addon1"
          value={cityValue}
          onChange={handleCityChange}
          ref={cityInputRef} // Agregamos la referencia al input de la ciudad
          required
        />
      </div>

      {/* Input para el título */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Título"
          aria-label="Titulo"
          aria-describedby="basic-addon1"
          maxLength="35"
          onChange={handleInputTitleChange}
          required
        />
      </div>

      {/* Contenedor de etiquetas (tags) */}
      <div className="tags-container mb-3">
        {tags.map((tag, index) => (
          <span key={index} className="tag-item">
            #{tag}
            <span
              type="button"
              className="ms-1"
              aria-label="Remove"
              onClick={() => handleRemoveTag(index)}
            >
              <i className="fa-solid fa-x fa-xs" style={{ color: "#949494" }}></i>
            </span>
          </span>
        ))}
      </div>

      {/* Dropdown para seleccionar tags integrado en input-group */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control dropdown-toggle custom-dropdown-input"
          placeholder="Selecciona un tag"
          aria-label="Selecciona un tag"
          aria-describedby="basic-addon2"
          value={inputValue}
          readOnly
          data-bs-toggle="dropdown"
        />
        <ul className="dropdown-menu w-100">
          {predefinedTags.map((tag, index) => (
            <li key={index}>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => handleSelectTag(tag)}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Textarea para la descripción */}
      <div className="mb-3">
        <textarea
          className="form-control"
          id="itiDescInput"
          rows="6"
          placeholder="Escribe algo aquí..."
          maxLength="250"
          onChange={handleInputDescChange}
          required
        ></textarea>
      </div>
    </div>
  );
};
