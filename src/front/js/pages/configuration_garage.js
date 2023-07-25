import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "/workspaces/Watacar_v2/src/front/styles/configuration.css"
import { Profile_navbar } from "../component/profile_navbar";

export const Configuration_Garage = () => {
    const params = useParams();
    const {actions, store} = useContext(Context);
    const [data, setData] = useState(store.garage);
    const navigate =useNavigate();

    useEffect (() => {
        actions.getMyGarage()
    }, [])

const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
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
  
      setData({ ...data, address: address }); 
    });
  };

const handleSubmit = (event) => {
    event.preventDefault()
    console.log(data)

    const putConfigGarage = {
        method: "PUT",
        body: JSON.stringify({
            "name": data.name,
            "mail": data.mail,
            "web": data.web,
            "phone": data.phone,
            "address": data.address,
            "description": data.description,
            "cif": data.cif,
            "image_id": data.image_id,
            "product_id": data.product_id,
            "user_id": data.user_id

          
            
        }),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }
    fetch(process.env.BACKEND_URL + `api/configuration/garage`, putConfigGarage )
    .then((response) => response.json())
    .then((response) => {
        setData({ ...data, response});
        navigate('/profile/garage')
    })
    .catch((error) => {
        console.error(error);
    })
};

return store.garage ? (
    <>
<Profile_navbar />
<div className="container mt-3 w-75 box py-4 justify-content-start"> 
                    <div>
                        <Link to="/profile/configuration" className="btn_config back mb-3">
                                Atrás
                        </Link>
                        </div>

    
        <div className="container mt-3 w-75 py-4 justify-content-start "> 
            <h2  className="ms-4"><strong>Configurar tu Taller</strong></h2>

            <div className="container">
                <div className="avatar_container pb-4">
                    <img src="https://neomotor.epe.es/binrepository/990x619/0c62/990d557/none/2594535/UHEL/elegir-taller-confianza-1_285-37667622_20221031082702.jpg" alt="Avatar" className="avatar_image" />
                </div>
                
                <div className="profile_info">
                    <div className="row  my-4 ">
                        <div>
                        <label className="my-2 col-10 col-sm-10 col-md-6 col-lg-5 label p-2 input-radius">Nombre del Taller:</label>
                        </div>
                        <input className="col-8  user_data" name="name" type="text" value={data.name || store.garage.name} onChange={handleChange}></input>
                    </div>
                    <div className="row  my-4">
                        <div>
                        <label className=" my-2 col-10 col-sm-10 col-md-6 col-lg-5  label p-2 input-radius">Correo del Taller:</label>
                        </div>
                        <input className="my-2 col-8 user_data " name="mail" type="text" value={data.mail || store.garage.mail} onChange={handleChange}></input>
                    </div>
                        <div className="row  my-3">
                            <div>
                            <label className="col-10 col-sm-10 col-md-6 col-lg-5 label p-2 input-radius">Sitio Web:</label>
                           </div>
                           <input className="my-2 col-8 user_data" name="web" type="text" value={data.web || store.garage.web} onChange={handleChange}></input>
                        </div>
                        <div className="row my-3">
                            <div>
                            <label className="col-10 col-sm-10 col-md-6 col-lg-5  label p-2 input-radius">CIF:</label>
                            </div>
                            <input className="my-2 col-8 user_data " name="cif" type="text" value={data.cif || store.garage.cif} onChange={handleChange}></input>
                        </div>
                    <div className="row my-3">
                        <div>
                        <label className="col-10 col-sm-10 col-md-6 col-lg-5 label p-2 input-radius">Teléfono:</label>
                        </div>
                        <input className="my-2 col-8 user_data " name="phone" type="text" value={data.phone || store.garage.phone} onChange={handleChange}></input>
                    </div>
                    <div className="row my-3">
                        <div>
                        <label className="col-10 col-sm-10 col-md-6 col-lg-5 label p-2 input-radius">Dirección:</label>
                        </div>
                        <input className=" my-2 col-8 user_data " name="address" id="address" type="text" value={data.address || store.garage.address} onChange={handleChange}></input>
                    </div>
                    <div className="row save_cancel_config">
                        <Link to="/profile/garage" className="btn_config cancel">
                            Cancelar
                        </Link>
                        <button  className="btn_config save" onClick={handleSubmit}>
                            Guardar
                        </button>
                    </div>
                </div>
        </div>
        </div>
    </div>
    </>
): "cargando...";
}