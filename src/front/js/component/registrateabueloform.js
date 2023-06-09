import React, { useState } from "react";

export function RegistrateAbueloForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const inputName = form.elements.inputName.value;
        const inputSurname = form.elements.inputSurname.value;
        const inputUserName = form.elements.inputUserName.value;
        const inputEmail = form.elements.inputEmail.value;
        const inputPassword = form.elements.inputPassword.value;
        const inputRepeatPassword = form.elements.inputRepeatPassword.value;

        if (!inputName || !inputSurname || !inputUserName || !inputEmail || !inputPassword || !inputRepeatPassword) {
            setShowAlert(true);
            return;
        }

        if (inputPassword !== inputRepeatPassword) {
            setPasswordMatch(false);
            return;
        }

        const newUser = {
            user_name: inputUserName,
            email: inputEmail,
            password: inputPassword,
            first_name: inputName,
            last_name: inputSurname,
            is_grandparent: false,
        };


        // Make the POST request to your API endpoint
        fetch(process.env.BACKEND_URL + "/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                // Handle successful signup
                console.log("New user created:", data);
                // Redirect to google.com
                window.location.href = "/landing";
            })
            .catch((error) => {
                // Handle signup error
                console.error("Error creating user:", error);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-1">
                  
                </div>
                <div className="col-md-6">
                    <form className="m-5" onSubmit={handleSubmit}>
                        <div className="text-center mb-4">
                            <h1>Registrate</h1>
                        </div>
                        {showAlert && (
                            <div className="alert alert-danger" role="alert">
                                Por favor, completa todos los campos.
                            </div>
                        )}
                        {!passwordMatch && (
                            <div className="alert alert-danger" role="alert">
                                Las contraseñas no coinciden.
                            </div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">
                                <h5>Nombre</h5>
                            </label>
                            <input type="text" className="form-control" id="inputName" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputSurname" className="form-label">
                                <h5>Apellido</h5>
                            </label>
                            <input type="text" className="form-control" id="inputSurname" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputUserName" className="form-label">
                                <h5>Nombre de Usuario</h5>
                            </label>
                            <input type="text" className="form-control" id="inputUserName" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">
                                <h5>Email</h5>
                            </label>
                            <input type="email" className="form-control" id="inputEmail" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">
                                <h5>Contraseña</h5>
                            </label>
                            <div className="input-group">
                                <input type={showPassword ? "text" : "password"} className="form-control" id="inputPassword" required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputRepeatPassword" className="form-label">
                                <h5>Repita la contraseña</h5>
                            </label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="inputRepeatPassword"
                                    required
                                />
                                <button className="btn btn-outline-secondary" type="button" onClick={toggleShowPassword}>
                                    {showPassword ? (
                                        <i className="fa-solid fa-eye-slash"></i>
                                    ) : (
                                        <i className="fa-solid fa-eye"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                <h5>Sign up</h5>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-md-4 ms-5" style={{marginTop:"13rem"}}>
                   <h4>"¡Conéctate y comparte tus experiencias doradas!"</h4>
                   <h4 className="mt-4">"Descubre nuevas amistades, revive recuerdos y mantente conectado con tus seres queridos" </h4>
                </div>
            </div>
        </div>
    );
}
