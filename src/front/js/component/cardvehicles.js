import React, {useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const CardVehicles = ({ vehicle }) => {
    const { store, actions } = useContext(Context);
    const [isFavorite, setIsFavorite] = useState(false);
    const token = localStorage.getItem("token");

    const addOrRemove = async () => {
        if (isFavorite) {
            await actions.removeFav(vehicle.id);
        } else {
            await actions.addFav(vehicle.id);
        }
    }

   useEffect(() => {
        setIsFavorite(store.favorites.some((favorite) => favorite.id == vehicle.id));
    }, [store.favorites]);

    return (
        <div className="vehiculo card col-md-4" style={{ width: "22rem", height: "27rem" }}>
            <div>
                <a className="cardvehicles" href="#">
                    <img className="imagen1" src={vehicle.url_img1} style={{width: "100%", objectFit: "cover", height: "12rem"}} />
                </a>
            </div>
            <div className="card-body ms-2 p-2">
                <h3 className="card-title mt-2 mb-4 text-success"><strong>{vehicle.marca_modelo.toUpperCase()}</strong></h3>
                <p className="card-text mb-3 fs-5"><strong>Asientos:</strong> {vehicle.asientos}</p>
                <p className="card-text fs-5 mb-3"><strong>Precio:</strong> {vehicle.precio} €</p>
            </div>
                {token ?
                    <div className="d-flex justify-content-between mx-3">
                        <Link to={`/details/${vehicle.id}`}>
                            <button className="btn-success btn-lg border-2 rounded-4 mb-3"><strong>Más Detalles</strong></button>
                        </Link>
                        <div className="me-2">
                            <button className="corazon btn btn-outline-success btn-lg border-2 rounded-4" onClick={addOrRemove}>
                                <i className={`fa-heart ${isFavorite ? "fas text-success" : "far"}`}></i>
                            </button>
                        </div>
                    </div>
                    : null
                }
        </div>
    )
};