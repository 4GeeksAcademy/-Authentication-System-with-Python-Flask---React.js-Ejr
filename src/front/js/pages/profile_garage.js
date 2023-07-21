import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { NavLink, Link } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import { Placeholder_profile } from "./placeholder_profile";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"


export const Profile_garage = () => {
    const {actions, store} = useContext(Context);

    useEffect (() => {
        
        actions.getMyGarage()
    }, [])

  
    return store.garage ? (
        <>
            <Profile_navbar />
            <div className="container mt-3 ms-5"> <h2 ><strong>Tu Taller</strong></h2></div>
           
            <div className="container_profile">
                <div className="avatar_container">
                    <img src="https://neomotor.epe.es/binrepository/990x619/0c62/990d557/none/2594535/UHEL/elegir-taller-confianza-1_285-37667622_20221031082702.jpg" alt="Avatar" className="avatar_image" />
                </div>
               
                <div className="profile_info">
                    <div className="row row_profile_configuration">
                        <h4 className="col-3 label input-radius">Nombre del Taller:</h4>
                        <h4 className="col-8 user_data">{store.garage.name}</h4>
                    </div>
                    <div className="row row_profile_configuration">
                        <h4 className="col-3 label input-radius">Correo del Taller:</h4>
                        <h4 className="col-8 user_data">{store.garage.mail}</h4>
                    </div>
                    <div className="row row_profile_configuration">
                        <h4 className="col-3 label input-radius">Sitio Web:</h4>
                        <h4 className="col-8 user_data">{store.garage.web}</h4>
                    </div>
                    <div className="row row_profile_configuration">
                        <h4 className="col-3 label input-radius">CIF:</h4>
                        <h4 className="col-8 user_data">{store.garage.cif}</h4>
                    </div>
                    <div className="row row_profile_configuration">
                        <h4 className="col-3 label input-radius">Teléfono :</h4>
                        <h4 className="col-8 user_data">{store.garage.phone}</h4>
                    </div>
                    <div className="row row_profile_configuration " >
                        <h4 className="col-3 label input-radius" >Dirección:</h4>
                        <h4 className="col-8 user_data">{store.garage.address}</h4>
                    </div>

              
                    

                    <div className="row row_edit_profile">
                        <Link to="/configuration/garage" className="edit_profile col-3 label">
                            Editar 
                        </Link>
                    </div>
                </div>

                


          </div>
        </>
    ): 
  (  
   <div className="container justify-content-center">
    <h3>Cargando</h3>
    </div>
)
}