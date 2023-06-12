import React from "react";
import { Link } from "react-router-dom";
import LoginModal from "../pages/loginModal";
import "../../styles/profile.css";

export const ProfileNotifications = () => {
    return (
        <div className="container-xl px-4" style={{paddingTop:"3rem", marginBottom: "30rem"}}>
            <h1 className="main-title text-center pt-5 pb-0 mb-0">Bienvenido a tu Perfil</h1>
            {/* Account page navigation */}
            <nav className="nav nav-borders">
                <Link to="/profile">
                    <button className="nav-link ms-0" target="__blank">Perfil</button>
                </Link>
                <Link to="/billing">
                    <button className="nav-link" target="__blank">Pagos</button>
                </Link>
                <Link to="/security">
                    <button className="nav-link" target="__blank">Seguridad</button>
                </Link>
                <Link to="/notifications">
                    <button className="nav-link active" target="__blank">Notificaciones</button>
                </Link>
            </nav>
            <hr className="mt-0 mb-4"></hr>
            <div className="row">
                <div className="col-lg-8">
                    {/* <Email notifications preferences card */}
                    <div className="card card-header-actions mb-4 gradient-custom-contrast">
                        <div className="card-header">
                            Notificaciones por correo
                            <div className="form-check form-switch">
                                <input className="form-check-input" id="flexSwitchCheckChecked" type="checkbox"></input>
                                <label className="form-check-label" htmlFor="flexSwitchCheckChecked"></label>
                            </div>
                        </div>
                        <div className="card-body">
                            <form>
                                {/* Form Group (default email) */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputNotificationEmail">Correo predeterminado para notificaciones</label>
                                    <input className="form-control" id="inputNotificationEmail" type="email" disabled="" placeholder="Tu correo electrónico"></input>
                                </div>
                                {/* Form Group (email updates checkboxes) */}
                                <div className="mb-0">
                                    <label className="small mb-2">Que notificaciones quieres recibir?</label>
                                    <div className="form-check mb-2">
                                        <input className="form-check-input" id="checkAccountChanges" type="checkbox"></input>
                                        <label className="form-check-label" htmlFor="checkAccountChanges">Cambios a tu cuenta</label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input className="form-check-input" id="checkProductNew" type="checkbox"></input>
                                        <label className="form-check-label" htmlFor="checkProductNew">Información de productos y servicios que lanzemos</label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input className="form-check-input" id="checkPromotional" type="checkbox"></input>
                                        <label className="form-check-label" htmlFor="checkPromotional">Promociones y Marketing</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" id="checkSecurity" type="checkbox" disabled=""></input>
                                        <label className="form-check-label" htmlFor="checkSecurity">Alertas de seguridad</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* Notifications preferences card */}
                    <div className="card gradient-custom-contrast">
                        <div className="card-header">Preferencias de notificaciones</div>
                        <div className="card-body">
                            <form>
                                {/* Form Group (notification preference checkboxes) */}
                                <div className="form-check mb-3">
                                    <input className="form-check-input" id="checkAutoProduct" type="checkbox"></input>
                                    <label className="form-check-label" htmlFor="checkAutoProduct">Recibe notificaciones de productos en lanzamiento</label>
                                </div>
                                {/* Submit button */}
                                <button className="btn btn-outline-danger text-danger">Anular todas las notificaciones</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <LoginModal />
        </div>
    )
};

export default ProfileNotifications;