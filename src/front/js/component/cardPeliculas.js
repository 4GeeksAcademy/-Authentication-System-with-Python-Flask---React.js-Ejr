import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const CardPeliculas = ({ nombrePelicula, generoPelicula }) => {
    const { actions } = useContext(Context)
    return (
        <div className="containerfliud" style={{backgroundColor: "#3B3B3B"}}>
            <div className="col m-4 d-flex">
                <div className="card h-100 text-light rounded-lg" style={{ width: "18rem", backgroundColor: "#2B2B2B", borderRadius: "15px"}}>
                    <img
                        src={"https://media.istockphoto.com/id/1163498728/es/foto/gran-familia.jpg?s=612x612&w=0&k=20&c=DiOu0jRkhrX87OEk7lUoT_C39UsjLvKLS0NbXKvX_MQ="} //#+ (id) + ".jpg" 
                        className="card-img-top" style={{borderTopLeftRadius: "15px", borderTopRightRadius: "15px"}}
                        alt="..."
                    />
                    <div className="card-body">
                    <h5 className="card-title" style={{ fontFamily: "Work Sans, sans-serif" }}>Título: {nombrePelicula}</h5>
                        <p className="card-title" style={{ fontFamily: "Work Sans, sans-serif" }}> Género: {generoPelicula} </p>
                        <div className="col-md d-flex justify-content-end">
                        <button className="btn btn-sm btn-custom-purple border-0 mt-3" onClick={() => actions.agregarMiLista(nombrePelicula)}>
                                + Mi Lista
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};