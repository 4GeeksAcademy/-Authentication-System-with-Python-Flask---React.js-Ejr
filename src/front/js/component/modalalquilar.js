import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ModalAlquilar = (props) => {
    const {actions } = useContext(Context);
    const [days, setDays] = useState(null);
    return (
        <>
            <button type="button" className="botonAlquilar btn btn-outline-success btn-lg border-2 mb-5 fs-2 justify-content-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Alquiler
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">¿Cuantos días desea alquilar?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-check">
                                <input onClick={() => setDays(7)} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    7 días
                                </label>
                            </div>
                            <div className="form-check">
                                <input onClick={() => setDays(15)}className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    15 días
                                </label>
                            </div>
                            <div className="form-check">
                                <input onClick={() => setDays(30)} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3"/>
                                <label className="form-check-label" htmlFor="flexRadioDefault3">
                                    30 días
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <Link to = "/payment">
                                <button onClick={() => actions.payment(props.id, days, props.precio, props.marca_modelo)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    );
};