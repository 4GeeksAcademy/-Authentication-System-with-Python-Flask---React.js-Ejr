import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const ProfileInformation = (props) => {
    const { store, actions } = useContext(Context);
    const [userInformation, setUserInformation] = useState({
        user_id: props.user_id,
        email: props.email,
        name: props.name,
        lastname: props.lastname,
        profileimg: props.profileimg,
        currentpassword: "",
        newpassword: "",
    });

    const handleUpdateUser = (e) => {
        e.preventDefault();
        actions.updateUser(userInformation);
    }

    return (
        <div className="Profile_information">
            <nav className="nav flex-column">
                <form className="form" method="POST" action="/updateUser" enctype="application/json" onSubmit={handleUpdateUser}>
                    <a className="nav-link active" aria-current="page" href="#">
                        Profile Information
                    </a>
                    <div className="row align-items-center">
                        <div className="col-md-2">
                            <img src={userInformation.profileimg} alt="Profile Icon" style={{ width: "5rem", height: "5rem" }} className="rounded-circle" />
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
                            <input type="text" value={userInformation.name} onChange={(e) => setUserInformation({...userInformation, name: e.target.value })} className="form-control" id="name" required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label my-3" for="lastname">Surname</label>
                            <input type="text" value={userInformation.lastname} onChange={(e) => setUserInformation({...userInformation, lastname: e.target.value })} className="form-control" id="lastname" required />
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col-6">
                            <label htmlFor="inputAddress" className="form-label my-3">
                                Email
                            </label>
                            <input type="email" value={userInformation.email} onChange={(e) => setUserInformation({...userInformation, email: e.target.value })} className="form-control" id="email" required />
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
                                onChange={(e) => setUserInformation({...userInformation, currentpassword: e.target.value })}
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
                                onChange={(e) => setUserInformation({...userInformation, newpassword: e.target.value })}
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
                            <button className="btn" onClick={() => actions.deleteAccount()} style={{ color: "red", textDecoration: "underline", border: "none" }}>Delete account</button>
                        </div>
                    </div>
                </form>
            </nav>
        </div>
    )
}
