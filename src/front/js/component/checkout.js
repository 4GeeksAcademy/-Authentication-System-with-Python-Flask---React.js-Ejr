import React, { useContext, useState, useEffect  } from "react";
import { Link, useParams } from "react-router-dom";
import LoginModal from "../pages/loginModal";
import "../../styles/profile.css";
import { Context } from "../store/appContext";

export const Checkout = () => {
    const {store, actions} = useContext(Context)

    function imgError(e) {
        e.target.src = "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/f3918add-a5b5-437e-9bed-186b25ef5636/DreamShaper_v5_3_An_AIpowered_machine_surrounded_by_a_vibr_1.jpg"
    }

    return (
        <>
        {store.user && store.user.length>0 && store.user.map((item, index) => {
            return(
            <div key={index} className="container mt-5">
                {/* payment details page */}
                <div className="container-fluid">
                    <h1 className="main-title">GitLoot</h1>
                    <p className="sub-title fs-4"><strong>Página de pagos</strong></p>
                    <h1 className="sub-title">Métodos de pago</h1>
                    <div className="mx-4 border rounded border-secondary mt-4" style={{width: "18%"}}>
                        <div className="fab fa-cc-visa fa-2x cc-color-visa mx-2 my-2"></div>
                        <div className="fab fa-cc-mastercard fa-2x cc-color-mastercard mx-2 my-2"></div>
                        <div className="fab fa-cc-amex fa-2x cc-color-amex mx-2 my-2"></div>
                    </div>
                    <form className="m-5 gradient-custom-contrast py-4 px-3 rounded">
                                {/* (username) */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputUsername">Nombre de usuario (como quieres que te llamemos?)</label>
                                    <input className="form-control" id="inputUsername" type="text" placeholder="Tu Usuario" value={item.displayName}></input>
                                </div>
                                {/* Form Row */}
                                <div className="row gx-3 mb-3">
                                    {/* Form Group (first name) */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputFirstName">Nombres</label>
                                        <input className="form-control" id="inputFirstName" type="text" placeholder="Tus Nombres" value={item.firstName}></input>
                                    </div>
                                    {/* Form Group (last name) */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputLastName">Apellido</label>
                                        <input className="form-control" id="inputLastName" type="text" placeholder="Tus Apellidos" value={item.secondName}></input>
                                    </div>
                                </div>
                                {/* Form Row */}
                                <div className="row gx-3 mb-3">
                                    {/* (location) */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputLocation">Tu dirección</label>
                                        <input className="form-control" id="inputLocation" type="text" placeholder="Tu dirección" value={item.address}></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputLocationDetails">Cuentanos algun otro detalle de tu direccion</label>
                                        <input className="form-control" id="inputLocationDetails" type="text" placeholder="Apto, casa, contunto, torre y otros detalles" value={item.addressDetail}></input>
                                    </div>
                                </div>
                                {/* (email address) */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputEmailAddress">Tu correo</label>
                                    <input className="form-control" id="inputEmailAddress" type="email" placeholder="Tu Correo Electrónico" value={item.email}></input>
                                </div>
                                {/* Form Row */}
                                <div className="row gx-3 mb-3">
                                    {/* phone number */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                        <input className="form-control" id="inputPhone" type="tel" placeholder="Tu Número Celular" value={item.phone}></input>
                                    </div>
                                    {/* birthday */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputBirthday">Birthday</label>
                                        <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Tu Fecha de Nacimiento"value={`${item.birthDay}/${item.birthMonth}/${item.birthYear}`}></input>
                                    </div>
                                </div>
                                {/* Save changes button */}
                                <button className="btn btn-outline-success px-4" style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}} type="button">Guardar</button>
                            </form>
                </div>
                {/* payment summary page */}
                <div className="container-fluid mt-5">
                    <div className="">
                        <h1 className="sub-title fs-3">Resumen de lo que vas a pedir:</h1>
                            
                    </div>
                </div>
            </div>
            )})|| <h1 className="main-title">Loading.... :3</h1>}
        </>
    )
}

export default Checkout;