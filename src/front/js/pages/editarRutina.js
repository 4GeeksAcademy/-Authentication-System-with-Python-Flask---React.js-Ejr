import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { EdicionRutina } from "../component/edicionRutina.js";

export const EditarRutina = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <EdicionRutina />
        </>
    );
};