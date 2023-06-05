import React from "react";
import { Link } from "react-router-dom";
import LoginModal from "../pages/loginModal";
import "../../styles/profile.css";

export const Profile = () => {
    return (
        <div className="container-xl px-4 mt-4">
    {/* Account page navigation */}
    <nav className="nav nav-borders">
        <a className="nav-link active ms-0" href="https://www.bootdey.com/snippets/view/bs5-edit-profile-account-details" target="__blank">Profile</a>
        <a className="nav-link" href="https://www.bootdey.com/snippets/view/bs5-profile-billing-page" target="__blank">Billing</a>
        <a className="nav-link" href="https://www.bootdey.com/snippets/view/bs5-profile-security-page" target="__blank">Security</a>
        <a className="nav-link" href="https://www.bootdey.com/snippets/view/bs5-edit-notifications-page"  target="__blank">Notifications</a>
    </nav>
    <hr className="mt-0 mb-4"></hr>
    <div className="row">
        <div className="col-xl-4">
            {/* Profile picture card */}
            <div className="card mb-4 mb-xl-0">
                <div className="card-header">Foto de perfil:</div>
                <div className="card-body text-center">
                    {/* Profile picture image */}
                    <img className="img-account-profile rounded-circle mb-2 img-thumbnail" src="https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/5d52955e-942f-44f3-8686-94611922d455/DreamShaper_v5_3_An_AIpowered_android_woman_with_celticlik_0.jpg" alt=""></img>
                    {/* Profile picture help block */}
                    <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                    {/* Profile picture upload button */}
                    <button className="btn btn-primary" type="button">Upload new image</button>
                </div>
            </div>
        </div>
        <div className="col-xl-8">
            {/* Account details card */}
            <div className="card mb-4">
                <div className="card-header">Account Details</div>
                <div className="card-body">
                    <form>
                        {/* (username) */}
                        <div className="mb-3">
                            <label className="small mb-1" for="inputUsername">Nombre de usuario (como quieres que te llamemos?):</label>
                            <input className="form-control" id="inputUsername" type="text" placeholder="Francesco Virgolini"></input>
                        </div>
                        {/* Form Row */}
                        <div className="row gx-3 mb-3">
                            {/* Form Group (first name) */}
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputFirstName">Nombres</label>
                                <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value="Valerie"></input>
                            </div>
                            {/* Form Group (last name) */}
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputLastName">Apellido</label>
                                <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="Luna"></input>
                            </div>
                        </div>
                        {/* Form Row */}
                        <div className="row gx-3 mb-3">
                            {/* (location) */}
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputLocation">Tu dirección:</label>
                                <input className="form-control" id="inputLocation" type="text" placeholder="Enter your location" value="Bogotá, Colombia carrera 1 # 1 - 1 111111"></input>
                            </div>
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputLocation">Cuentanos algun otro detalle de tu direccion:</label>
                                <input className="form-control" id="inputLocation" type="text" placeholder="Enter your location" value="Conjunto, apto, torre, piso, casa"></input>
                            </div>
                        </div>
                        {/* (email address) */}
                        <div className="mb-3">
                            <label className="small mb-1" for="inputEmailAddress">Tu correo:</label>
                            <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value="juanillo@4weeks.es"></input>
                        </div>
                        {/* Form Row */}
                        <div className="row gx-3 mb-3">
                            {/* phone number */}
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputPhone">Phone number</label>
                                <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value="3013182183"></input>
                            </div>
                            {/* birthday */}
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputBirthday">Birthday</label>
                                <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value="6/enero/1995"></input>
                            </div>
                        </div>
                        {/* Save changes button */}
                        <button className="btn btn-primary" type="button">Save changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
    )
};
export default Profile;