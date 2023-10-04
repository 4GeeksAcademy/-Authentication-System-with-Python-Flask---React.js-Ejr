import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";


export const MySaleBooks = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getMySaleBooks(store.currentUser?.user?.id);
        actions.getMyExchangeBooks(store.currentUser?.user?.id);
        actions.getAllMyPurchasedBooks(store.currentUser?.user?.id);
        actions.getAllMySoldBooks(store.currentUser?.user?.id);




    }, [store.currentUser?.user?.id]);

    return (
        <div>
            <div className="container-fluid">
                <div className="text-center m-3 mt-5 mb-5">
                    <h1>MIS LOS LIBROS EN VENTA</h1>
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                    {store.mySaleBooks.map((libro, i) => (
                        <div className="card shadow-sm  m-3" style={{ width: "220px", height: "300" }} key={i}>
                            <div className="d-flex justify-content-center">
                                <img className="card-img-top" style={{ maxWidth: "100%", maxHeight: "300px" }} src={libro.photo} alt={`Portada de ${libro.title}`} />
                            </div>
                            <div className="card-body">
                                <h6 className="card-title">{libro.title}</h6>
                                <p className="card-text">{libro.author}</p>
                                <p className="card-text">${libro.price}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center m-1">
                                <Link to={`/mySaleBooks/mySaleBookDetails/${libro.id}`} className="btn btn-dark">Ver detalles</Link>
                                <i className="fa-regular fa-heart fa-2x"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};