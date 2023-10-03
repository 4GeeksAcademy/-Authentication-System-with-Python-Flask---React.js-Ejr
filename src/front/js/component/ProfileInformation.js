import React, { useState } from "react";
import { Context } from "../store/appContext";

export const ProfileInformation = (props) => {
    const [userInformation, setUserInformation] = useState({
        user_id: props.user_id,
        email: props.email,
        name: props.name,
        lastname: props.lastname,
        profileimg: props.profileimg,
    });


    return (
        <div className="Profile_information">
            <nav className="nav flex-column">
                <a className="nav-link active" aria-current="page" href="#">
                    Profile Information
                </a>
                <div className="row align-items-center">
                    <div className="col-md-2">
                        <img src={props.profileimg} alt="Profile Icon" style={{ width: "5rem", height: "5rem" }} className="rounded-circle" />
                    </div>
                    <div className="col-md-7">
                        <div class="input-group mb-3">
                            <input type="file" class="form-control" id="inputGroupFile02" />
                            <label class="input-group-text" for="inputGroupFile02">Upload</label>
                        </div>
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="inputEmail4" className="form-label my-3">
                            Name
                        </label>
                        <input type="text" className="form-control" id="inputEmail4" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputPassword4" className="form-label my-3">
                            Surname
                        </label>
                        <input type="text" className="form-control" id="inputPassword4" />
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-6">
                        <label htmlFor="inputAddress" className="form-label my-3">
                            Email
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputEmail"
                            placeholder="Email"
                        />
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-md-3">
                        <label htmlFor="inputAddress2" className="form-label my-3">
                            Current Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputAddress2"
                            placeholder="Current Password"
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="inputCity" className="form-label my-3">
                            New Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputCity"
                            placeholder="New Password"
                        />
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-md-12 mt-5">
                        <button type="submit" className="btn btn-primary mb-5 custom-update" style={{ width: "100px" }}>
                            Update
                        </button>
                    </div>
                </div>
                <h5>Delete account</h5>
                <p>
                    Would you like to delete this account? You won’t be able to
                    restore your information.
                </p>
                <div className="row g-3">
                    <div className="col-md-3">
                        <button className="btn" style={{ color: "red", textDecoration: "underline", border: "none" }}>Delete account</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}