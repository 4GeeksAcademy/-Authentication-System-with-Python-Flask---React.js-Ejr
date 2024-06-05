import React, {useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { EditarForm } from "../component/editarform.js";

export const EditarVehiculo = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const showForm = params.id == store.details.id;

    useEffect (() => {
        actions.getDetails(params.id);
    }, []);

    return (
        <div className="footer-view agregar-vehiculo">
            {showForm
                ? <EditarForm {...store.details} /> 
                : null
            }
        </div>
    )
 };
   