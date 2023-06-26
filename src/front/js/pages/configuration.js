import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "/workspaces/Watacar_v2/src/front/styles/configuration.css"

export const Configuration = () => {
    const params = useParams();
    const {actions, store} = useContext(Context);
    const [data, setData] = useState([])

    useEffect (() => {
        actions.getUser(params.id)
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
            "id_document": data.id_document,
            "id_number": data.id_number,
            "nameandsur": data.nameandsur,
            "phone": data.phone
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(process.env.BACKEND_URL + `api/configuration/${userId}`, putConfig )
    .then((response) => response.json())
    .then((response) => {
        console.log(data)
        setData({ ...data, response});
    })
    .catch((error) => {
        console.error(error);
    })
};

return store.user ? (
    <div>
        <Link to="/demo" className="btn_back_config">
                Back
        </Link>
        <div className="container_config">
            <h1 className="configuration_title">Configuración del perfil</h1>
                <div className="box col-12">
                    <div className="row">
                        <label>Name:</label>
                        <input className="col-8 input_config" name="nameandsur" type="text" value={data.nameandsur || store.user.nameandsur} onChange={handleChange}></input>
                    </div>
                    <div className="row">
                        <label className="col-4">Email:</label>
                        <input className="col-8 input_config" name="email" type="text" value={data.email || store.user.email} onChange={handleChange}></input>
                    </div>
                        <div className="row">
                            <label className="col-4 doc_type" htmlFor= "Document_type">Document Type:</label>
                            <label className="col-4" htmlFor= "Document_number">Document Number:</label>
                        </div>
                        <div className="row">
                            <input className="col-4 input_config doc_type" name="Document Type" type="text" value={store.user.id_document}></input>
                            <input name="Document_number" className="col-4 input_config" type="text" value={data.Document_number || store.user.id_number} onChange={handleChange}></input>
                        </div>
                    <div className="row">
                        <label>Phone:</label>
                        <input className="col-8 input_config" name="phone" type="text" value={data.phone || store.user.phone} onChange={handleChange}></input>
                    </div>
                    <div className="row">
                        <label>Adress:</label>
                        <input className="col-8 input_config" name="adress" type="text" value={data.adress || store.user.address} onChange={handleChange}></input>
                    </div>
                </div>
                <div className="buttons_config">
                    <Link to="/demo" className="btn_save_config" onClick={handleSubmit}>
                        Save
                    </Link>
                    <Link to="/demo" className="btn_cancel_config">
                        Cancel
                    </Link>
                </div>
        </div>
    </div>
): "cargando...";
}