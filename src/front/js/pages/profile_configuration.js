import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { NavLink, Link } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const Profile_configuration = () => {
    const {actions, store} = useContext(Context);

    useEffect (() => {
        actions.getUser()
    }, [])
    return store.user ? (
        <>
            <Profile_navbar />
            <div className="container_profile">
                <div className="avatar_container">
                    <img src="https://appsdejoseluis.com/wp-content/uploads/2020/04/face_co.png" alt="Avatar" className="avatar_image" />
                </div>
                <div className="profile_info">
                    <div className="row row_profile_configuration">
                        <h4 className="col-3 label">Nombre y apellidos:</h4>
                        <h4 className="col-8 user_data">{store.user.full_name}</h4>
                    </div>
                    <div className="row row_profile_configuration">
                        <h4 className="col-3 label">Email:</h4>
                        <h4 className="col-8 user_data">{store.user.email}</h4>
                    </div>
                    <div className="row row_profile_configuration">
                        <h4 className="col-3 label">Tipo de documento:</h4>
                        <h4 className="col-8 user_data">{store.user.document_type}</h4>
                    </div>
                    <div className="row row_profile_configuration">
                        <h4 className="col-3 label">Número del documento:</h4>
                        <h4 className="col-8 user_data">{store.user.document_number}</h4>
                    </div>
                    <div className="row row_profile_configuration">
                        <h4 className="col-3 label">Teléfono:</h4>
                        <h4 className="col-8 user_data">{store.user.phone}</h4>
                    </div>
                    <div className="row row_profile_configuration">
                        <h4 className="col-3 label">Dirección:</h4>
                        <h4 className="col-8 user_data">{store.user.address}</h4>
                    </div>
                    <div className="row row_edit_profile">
                        <Link to="/configuration" className="edit_profile col-3 label">
                            Editar 
                        </Link>
                    </div>
                </div>
            </div>
        </>
    ): "cargando...";
}