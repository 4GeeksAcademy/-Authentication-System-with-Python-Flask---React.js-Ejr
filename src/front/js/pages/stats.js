import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { GraficoHistorico } from "../component/graficoHistorico";

export const Stats = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <GraficoHistorico />
        </>
    );
};