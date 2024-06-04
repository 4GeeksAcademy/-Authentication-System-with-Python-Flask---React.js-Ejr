import React, {useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { EditarForm } from "../component/editarform.js";

export const EditarVehiculo = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const hasDetails = Object.keys(store.details).length > 0; 

    useEffect (() => {
        actions.getDetails(params.id);
    }, []);

    return (
        <div className="footer-view agregar-vehiculo">
            {hasDetails
                ? <EditarForm {...store.details} /> 
                : null
            }
        </div>
    )
 };
   