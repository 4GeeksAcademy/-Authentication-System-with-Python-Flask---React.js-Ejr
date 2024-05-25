import React from "react";

export const FiltroAsientos = (props) => {
    
    return (
        <div className="dropdown">
            <button className="btn btn-outline-success border-1 dropdown-toggle bg-white text-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Cantidad de Asientos
            </button>
            <ul className="dropdown-menu ">
                <div className="form-check ms-2">
                    <input onChange={() => props.setFiltroAsientos(null)}  className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault0"/>
                    <label className="form-check-label" htmlFor="flexRadioDefault0">
                        Sin Filtro
                    </label>
                </div>
                <div className="form-check ms-2">
                    <input onChange={() => props.setFiltroAsientos(2)} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        2+
                    </label>
                </div>
                <div className="form-check ms-2">
                    <input onChange={() => props.setFiltroAsientos(4)} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        4+
                    </label>
                </div>
                <div className="form-check ms-2">
                    <input onChange={() => props.setFiltroAsientos(5)}  className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3"/>
                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                        5+
                    </label>
                </div>
                <div className="form-check ms-2">
                    <input onChange={() => props.setFiltroAsientos(7)} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4"/>
                    <label className="form-check-label" htmlFor="flexRadioDefault4">
                        7+
                    </label>
                </div>
            </ul>
        </div>
    )
};