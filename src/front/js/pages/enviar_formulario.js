import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

import { Context } from "../store/appContext";



const Enviar_formulario = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const { id } = useParams();

    return (
        <div>
            <div className="container-fluid d-flex">
                <div className="card shadow-sm m-3" style={{ width: "300px", height: "100%" }}>
                    <img src="" className="card-img-top" alt="Hollywood Sign on The Hill" style={{ width: "100%", height: "400px" }} />
                </div>
                <div className="m-3 mt-5 mb-5">
                    <h3>"NOMBRE DEL LIBRO"</h3>
                    <hr className="dropdown-divider" />
                    <br></br>
                    <div className="d-flex  "   >
                        <div className="p-0 " >
                            <p className="text-dark mb-3">"AUTOR"</p>
                            <p className="text-dark mb-3">"SOY UNA DESCRIPCION"</p>
                            <p className="text-dark mb-3">ID DEL LIBRO</p>

                        </div>
                    </div>
                    {/* <button onClick={(e) => { actions.allBookIdBuyUser }}>boton 1</button>
                    <button onClick={(e) => { actions.getMensajesLibro(store.allMessagesUser[0]?.book_id) }}>boton 2</button> */}
                </div>
                <div className="mt-3 ms-2  ">
                    <div className="border" style={{ width: "500px" }}>
                        <div className="border m-2 d-flex flex-column">
                            <div className="align-self-start text-primary m-2">
                                <p >"Hola estoy interesado en tu libro"</p>
                            </div>
                            <div className="align-self-end text-success m-2">
                                <p >Buenas tardes el libro sigue disponible</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <form className="form-control" /* onSubmit={submitMessage} */>
                            <textarea
                                className="form-control mb-0"
                                id="message_text"
                                aria-describedby="emailHelp"
                                placeholder="Ingresa el mensaje"
                                /* required */
                                name="message_text"
                            /* value={store.message_text}
                            onChange={actions.inputMessage1} */
                            />
                            <input
                                type="submit"
                                className="form-control mt-1"
                                onClick={(e) => { e.preventDefault(), actions.getMensajesUsuario() }}
                            />
                        </form>
                    </div>
                </div>

            </div>
        </div>

    );

};
export default Enviar_formulario

