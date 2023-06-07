import React from "react";
import { Link } from "react-router-dom";
import LoginModal from "../pages/loginModal";
import "../../styles/profile.css";

export const ProfileNotifications = () => {
    return (
        <div className="container-xl px-4" style={{paddingTop:"3rem"}}>
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
                    {/* SMS push notifications card */}
                    {/* <div className="card card-header-actions mb-4 gradient-custom-contrast">
                        <div className="card-header">
                            Push Notifications
                            <div className="form-check form-switch">
                                <input className="form-check-input" id="smsToggleSwitch" type="checkbox"></input>
                                <label className="form-check-label" htmlFor="smsToggleSwitch"></label>
                            </div>
                        </div> */}
                        {/* <div className="card-body">
                            <form> */}
                                {/* Form Group (default SMS number) */}
                                {/* <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputNotificationSms">Default SMS number</label>
                                    <input className="form-control" id="inputNotificationSms" type="tel" disabled=""></input>
                                </div> */}
                                {/* Form Group (SMS updates checkboxes) */}
                                {/* <div className="mb-0">
                                    <label className="small mb-2">Choose which types of push notifications you receive</label>
                                    <div className="form-check mb-2">
                                        <input className="form-check-input" id="checkSmsComment" type="checkbox"></input>
                                        <label className="form-check-label" htmlFor="checkSmsComment">Someone comments on your post</label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input className="form-check-input" id="checkSmsShare" type="checkbox"></input>
                                        <label className="form-check-label" htmlFor="checkSmsShare">Someone shares your post</label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input className="form-check-input" id="checkSmsFollow" type="checkbox"></input>
                                        <label className="form-check-label" htmlFor="checkSmsFollow">A user follows your account</label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input className="form-check-input" id="checkSmsGroup" type="checkbox"></input>
                                        <label className="form-check-label" htmlFor="checkSmsGroup">New posts are made in groups you're part of</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" id="checkSmsPrivateMessage" type="checkbox"></input>
                                        <label className="form-check-label" htmlFor="checkSmsPrivateMessage">You receive a private message</label>
                                    </div>
                                </div>
                            </form>
                        </div> 
                    </div>
                </div>
                <div className="col-lg-4"> */}
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