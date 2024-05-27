import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Favoritos = () => {
    const { store, actions } = useContext(Context);

    async function eliminarFavorito(vehicle_id) {
        let respuesta = await actions.removeFav(vehicle_id)
        if (respuesta === "success") {
            swal("Favorito eliminado correctamente", "", "success")
        }
    }

    useEffect(() => {
        actions.favorites();
    }, []);

    return (
        <>
            <div className="footer-view vehicles mb-5 mt-3 justify-content-center bg-light">
                <div className="container">
                    {store.favorites.length === 0
                        ? (
                            <>
                                <h2 className="mt-3 mb-2 text-success"><strong>MIS FAVORITOS</strong></h2>
                                <div className="fs-4 mt-4 mb-3"><strong>Crea tu primera lista de favoritos</strong></div>
                                <div className="texto-favoritos">Pulsa en el icono del corazón para guardar los coches y las experiencias <br></br> que más te gusten en Favoritos mientras buscas.</div>
                            </>
                        )
                        : (
                            <>
                                <h2 className="mt-3 mb-4 text-success text-center"><strong>MIS FAVORITOS</strong></h2>
                                <div className="row Map Cards text-dark d-flex justify-content-center">
                                    {store.favorites.map((vehicle) => (
                                        <div key={vehicle.id} className="vehiculo card col-md-4 mb-4 me-5" style={{ width: "22rem", height: "27rem" }}>
                                            <Link to={`/details/${vehicle.id}`} className="text-decoration-none text-black">
                                                    <img className="imagen1" src={vehicle.url_img1} style={{ width: "100%", objectFit: "cover", height: "12rem" }} />
                                                <div className="card-body ms-2 p-2">
                                                        <h3 className="card-title mb-3 text-success mt-2"><strong>{vehicle.marca_modelo.toUpperCase()}</strong></h3>
                                                        <p className="card-text mb-1"><strong>Tipo de motor:</strong> {vehicle.motor}</p>
                                                        <p className="card-text mb-1"><strong>Tipo de cambio:</strong> {vehicle.tipo_cambio}</p>
                                                        <p className="card-text mb-1"><strong>Asientos:</strong> {vehicle.asientos}</p>
                                                        <p className="card-text"><strong>Precio:</strong> {vehicle.precio} €</p>
                                                </div>
                                            </Link>
                                            <div className="d-flex justify-content-end">
                                                <button onClick={() => eliminarFavorito(vehicle.id)} className="btn-danger btn-lg border-2 rounded me-3">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
};