import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

import { Context } from "../store/appContext";



const PurchasedBooks = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()


    useEffect(() => {
        actions.allBookIdBuyUser();
    }, []);

    return (


        <div>
            <div className="container-fluid">
                <div className="text-center m-3 mt-5 mb-5">
                    <h1>Tus Compras e Intercambios</h1>
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                    {store.allMessagesUser.map((libro, i) => (
                        <div className="card shadow-sm  m-3" style={{ width: "220px", height: "300" }} key={i}>
                            <div className="d-flex justify-content-center">
                                <img className="card-img-top" style={{ maxWidth: "100%", maxHeight: "300px" }} src={libro.book.photo} alt={`Portada de ${libro.book.title}`} />
                            </div>
                            <div className="card-body">
                                <h6 className="card-title">{libro.book.title}</h6>
                                <p className="card-text">{libro.book.author}</p>
                                <p>indice: {i} </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center m-1">
                                <Link to={`/myBuyDetails/${i}`} className="btn btn-dark" >
                                    Ver detalles
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};
export default PurchasedBooks