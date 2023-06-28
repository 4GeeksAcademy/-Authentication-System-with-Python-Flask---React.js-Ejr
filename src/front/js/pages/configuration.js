import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "/workspaces/Watacar_v2/src/front/styles/configuration.css"

export const Configuration = () => {
    const params = useParams();
    const {actions, store} = useContext(Context);
    const [data, setData] = useState([])

    useEffect (() => {
        actions.getUser()
    }, [])

const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        //console.log(data);
      }

const handleSubmit = (event) => {
    event.preventDefault()

    const putConfig = {
        method: "PUT",
        body: JSON.stringify({
            "address": data.adress,
            "email": data.email,
            "document_type": data.document_type,
            "document_number": data.document_number,
            "full_name": data.full_name,
            "phone": data.phone
        }),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }
    fetch(process.env.BACKEND_URL + `api/configuration`, putConfig )
    .then((response) => response.json())
    .then((response) => {
        setData({ ...data, response});
    })
    .catch((error) => {
        console.error(error);
    })
};

return store.user ? (
    <div>
        <Link to="/demo" className="btn_back_config">
                Atrás
        </Link>
        <div className="container_config">
            <h1 className="configuration_title">Configuración del perfil</h1>
                <div className="box col-12">
                    <div className="row">
                        <label>Nombre:</label>
                        <input className="col-8 input_config" name="full_name" type="text" value={data.full_name || store.user.full_name} onChange={handleChange}></input>
                    </div>
                    <div className="row">
                        <label className="col-4">Email:</label>
                        <input className="col-8 input_config" name="email" type="text" value={data.email || store.user.email} onChange={handleChange}></input>
                    </div>
                        <div className="row">
                            <label className="col-4 doc_type" htmlFor= "Document_type">Tipo de documento:</label>
                            <label className="col-4" htmlFor= "Document_number">Número del documento:</label>
                        </div>
                        <div className="row">
                            <input className="col-4 input_config doc_type" name="Document Type" type="text" value={store.user.document_type}></input>
                            <input name="Document_number" className="col-4 input_config" type="text" value={data.document_number || store.user.document_number} onChange={handleChange}></input>
                        </div>
                    <div className="row">
                        <label>Teléfono:</label>
                        <input className="col-8 input_config" name="phone" type="text" value={data.phone || store.user.phone} onChange={handleChange}></input>
                    </div>
                    <div className="row">
                        <label>Dirección:</label>
                        <input className="col-8 input_config" name="adress" type="text" value={data.adress || store.user.address} onChange={handleChange}></input>
                    </div>
                </div>
                <div className="buttons_config">
                    <Link to="/demo" className="btn_save_config" onClick={handleSubmit}>
                        Guardar
                    </Link>
                    <Link to="/demo" className="btn_cancel_config">
                        Cancelar
                    </Link>
                </div>
        </div>
    </div>
): "cargando...";
}