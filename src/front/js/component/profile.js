import React from "react";
import { Link } from "react-router-dom";
import LoginModal from "../pages/loginModal";
import "../../styles/profile.css";

export const Profile = () => {
    return (
        <div className="container-xl px-4" style={{paddingTop:"3rem", marginBottom: "25rem"}}>
            <h1 className="main-title text-center pt-5 pb-0 mb-0">Bienvenido a tu Perfil</h1>  
            {/* Account page navigation */}
            <nav className="nav nav-borders">
                <Link to="/profile">
                    <button className="nav-link ms-0 active" target="__blank">Perfil</button>
                </Link>
                <Link to="/billing">
                    <button className="nav-link" target="__blank">Pagos</button>
                </Link>
                <Link to="/security">
                    <button className="nav-link" target="__blank">Seguridad</button>
                </Link>
                <Link to="/notifications">
                    <button className="nav-link" target="__blank">Notificaciones</button>
                </Link>
            </nav>
            <hr className="mt-0 mb-4"></hr>
            <div className="row">
                <div className="col-xl-4">
                    {/* Profile picture card */}
                    <div className="card mb-4 mb-xl-0 gradient-custom-contrast">
                        <div className="card-header">Foto de perfil:</div>
                        <div className="card-body text-center">
                            {/* Profile picture image */}
                            <img className="img-account-profile rounded-circle mb-2 img-thumbnail" src="https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/5d52955e-942f-44f3-8686-94611922d455/DreamShaper_v5_3_An_AIpowered_android_woman_with_celticlik_0.jpg" alt=""></img>
                            {/* Profile picture help block */}
                            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                            {/* Profile picture upload button */}
                            <button className="btn btn-outline-success px-4" type="button" style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}}>Upload new image</button>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    {/* Account details card */}
                    <div className="card mb-4 gradient-custom-contrast">
                        <div className="card-header">Account Details</div>
                        <div className="card-body">
                            <form>
                                {/* (username) */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputUsername">Nombre de usuario (como quieres que te llamemos?)</label>
                                    <input className="form-control" id="inputUsername" type="text" placeholder="Tu Usuario"></input>
                                </div>
                                {/* Form Row */}
                                <div className="row gx-3 mb-3">
                                    {/* Form Group (first name) */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputFirstName">Nombres</label>
                                        <input className="form-control" id="inputFirstName" type="text" placeholder="Tus Nombres"></input>
                                    </div>
                                    {/* Form Group (last name) */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputLastName">Apellido</label>
                                        <input className="form-control" id="inputLastName" type="text" placeholder="Tus Apellidos"></input>
                                    </div>
                                </div>
                                {/* Form Row */}
                                <div className="row gx-3 mb-3">
                                    {/* (location) */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputLocation">Tu dirección</label>
                                        <input className="form-control" id="inputLocation" type="text" placeholder="Tu dirección"></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputLocationDetails">Cuentanos algun otro detalle de tu direccion</label>
                                        <input className="form-control" id="inputLocationDetails" type="text" placeholder="Apto, casa, contunto, torre y otros detalles"></input>
                                    </div>
                                </div>
                                {/* (email address) */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputEmailAddress">Tu correo</label>
                                    <input className="form-control" id="inputEmailAddress" type="email" placeholder="Tu Correo Electrónico"></input>
                                </div>
                                {/* Form Row */}
                                <div className="row gx-3 mb-3">
                                    {/* phone number */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                        <input className="form-control" id="inputPhone" type="tel" placeholder="Tu Número Celular"></input>
                                    </div>
                                    {/* birthday */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputBirthday">Birthday</label>
                                        <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Tu Fecha de Nacimiento"></input>
                                    </div>
                                </div>
                                {/* Save changes button */}
                                <button className="btn btn-outline-success px-4" style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}} type="button">Save changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <LoginModal />
        </div>
            )
        };
export default Profile;