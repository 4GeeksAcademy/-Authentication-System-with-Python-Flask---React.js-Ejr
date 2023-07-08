import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "/workspaces/Watacar_v2/src/front/styles/configuration.css"
import { text } from "@fortawesome/fontawesome-svg-core";

export const Configuration = () => {
    const params = useParams();
    const {actions, store} = useContext(Context);
    const [data, setData] = useState([]);
    const navigate =useNavigate();
    

useEffect (() => {
    actions.getUser();
}, [])

const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        //console.log(data);
}

useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAf7aQ5JHWwJTvYuzpJw8QtQK8DYdwJqPE&libraries=places`;
    script.async = true;
    script.onload = handleScriptLoad;
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  const handleScriptLoad = () => {
    const input = document.getElementById("address");
    const autocomplete = new google.maps.places.Autocomplete(input);
  
    autocomplete.addListener("place_changed", () => {
      const selectedPlace = autocomplete.getPlace();
      const address = selectedPlace.formatted_address;
  
      setData({ ...data, adress: address }); // Cambia "address" a "adress"
    });
  };
  
  const handlePlaceSelect = () => {
    const addressObject = document.getElementById("address").value;
    // Aquí puedes utilizar el objeto `addressObject` para obtener información adicional del lugar seleccionado, si lo necesitas.
  };


const handleSubmit = (event) => {
    event.preventDefault()

    const updatedData = {
        ...store.user,
        ...data,
      };

    const putConfig = {
        method: "PUT",
        body: JSON.stringify({
            "address": updatedData.adress,
            "email": updatedData.email,
            "document_type": updatedData.document_type,
            "document_number": updatedData.document_number,
            "full_name": updatedData.full_name,
            "phone": updatedData.phone
        }),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }
    fetch(process.env.BACKEND_URL + "api/configuration", putConfig)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error al guardar los datos");
    })
    .then((responseData) => {
      setData({ ...data, response: responseData });
      navigate("/profile/configuration");
    })
    .catch((error) => {
      console.error(error);
    });
};


return store.user ? (
    <div>
        <Link to="/profile/configuration" className="btn_config back">
                Atrás
        </Link>
        <h2 className="configuration_title">Configuración del perfil</h2>
        <div className="container_config">
                <div className="avatar_container_configuration">
                    <img src="https://appsdejoseluis.com/wp-content/uploads/2020/04/face_co.png" alt="Avatar" className="avatar_image_configuration" />
                </div>
                <div className="profile_info">
                    <div className="row row_configuration">
                        <label className="col-3 label_config">Nombre:</label>
                        <input className="col-5 input_config" name="full_name" type="text" value={data.full_name || store.user.full_name} onChange={handleChange}></input>
                    </div>
                    <div className="row row_configuration">
                        <label className="col-3 label_config">Email:</label>
                        <input className="col-5 input_config" name="email" type="text" value={data.email || store.user.email} onChange={handleChange}></input>
                    </div>
                        <div className="row row_configuration">
                            <label className="col-3 label_config">Tipo de documento:</label>
                            <input className="col-5 input_config" name="document_Type" type="text" value={store.user.document_type}></input>
                        </div>
                        <div className="row row_configuration">
                            <label className="col-3 label_config">Número del documento:</label>
                            <input className="col-8 input_config" name="document_number" type="text" value={data.document_number || store.user.document_number} onChange={handleChange}></input>
                        </div>
                    <div className="row row_configuration">
                        <label className="col-3 label_config">Teléfono:</label>
                        <input className="col-8 input_config" name="phone" type="text" value={data.phone || store.user.phone} onChange={handleChange}></input>
                    </div>
                    <div className="row row_configuration">
                        <label className="col-3 label_config">Dirección:</label>
                        <input className="col-8 input_config" id="address" name="adress" type="text" value={data.adress || store.user.address} onChange={handleChange}></input>
                    </div>
                    <div className="row save_cancel_config">
                        <Link to="/profile/configuration" className="btn_config cancel">
                            Cancelar
                        </Link>
                        <Link to="/profile/configuration" className="btn_config save" onClick={handleSubmit}>
                            Guardar
                        </Link>
                    </div>
                </div>
        </div>
    </div>
): "cargando...";
}