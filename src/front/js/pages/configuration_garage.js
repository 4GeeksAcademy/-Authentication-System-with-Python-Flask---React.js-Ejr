import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "/workspaces/Watacar_v2/src/front/styles/configuration.css"

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
        console.log(data);
      }

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
    <div>
        <Link to="/profile/configuration" className="btn_config back">
                Atrás
        </Link>
        <h2 className="configuration_title">Configuración del perfil</h2>
        <div className="container_config">
                <div className="avatar_container_configuration">
                <img src="https://neomotor.epe.es/binrepository/990x619/0c62/990d557/none/2594535/UHEL/elegir-taller-confianza-1_285-37667622_20221031082702.jpg" alt="Avatar" className="avatar_image" />
                </div>
                <div className="profile_info">
                    <div className="row row_configuration">
                        <label className="col-3 label_config">Nombre del Taller:</label>
                        <input className="col-5 input_config" name="name" type="text" value={data.name || store.garage.name} onChange={handleChange}></input>
                    </div>
                    <div className="row row_configuration">
                        <label className="col-3 label_config">Correo del Taller:</label>
                        <input className="col-5 input_config" name="mail" type="text" value={data.mail || store.garage.mail} onChange={handleChange}></input>
                    </div>
                        <div className="row row_configuration">
                            <label className="col-3 label_config">Sitio Web:</label>
                            <input className="col-5 input_config" name="web" type="text" value={data.web || store.garage.web} onChange={handleChange}></input>/
                        </div>
                        <div className="row row_configuration">
                            <label className="col-3 label_config">CIF:</label>
                            <input className="col-8 input_config" name="cif" type="text" value={data.cif || store.garage.cif} onChange={handleChange}></input>
                        </div>
                    <div className="row row_configuration">
                        <label className="col-3 label_config">Teléfono:</label>
                        <input className="col-8 input_config" name="phone" type="text" value={data.phone || store.garage.phone} onChange={handleChange}></input>
                    </div>
                    <div className="row row_configuration">
                        <label className="col-3 label_config">Dirección:</label>
                        <input className="col-8 input_config" name="address" type="text" value={data.address || store.garage.address} onChange={handleChange}></input>
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
): "cargando...";
}