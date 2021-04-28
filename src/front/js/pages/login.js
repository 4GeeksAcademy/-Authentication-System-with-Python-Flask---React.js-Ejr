import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");

	// const handleSubmit = e => {
	// 	e.preventDefault();

	// 	const body = {
	// 		email: email,
	// 		password: password
	// 	};

	// 	// fetch de LOGIN change the URL
	// 	fetch("https://3000-black-donkey-1oovt2aw.ws-us03.gitpod.io/login", {
	// 		method: "POST",
	// 		body: JSON.stringify(body),
	// 		headers: {
	// 			"Content-Type": "application/json"
	// 		}
	// 	})
	// 		.then(res => res.json())
	// 		.then(data => {
	// 			console.log(data);
	// 			// añadir token a session
	// 			sessionStorage.setItem("my_token", data.token);
	// 			// let token = sessionStorage.getItem("my_token")
	// 		})
	// 		.catch(err => console.log(err));
	// };

	return (

         <div className="container rounded shadow w-75 h-50 bg-primary mt-5">
        <div className="row align-items-stretch">
            <div className="col col-md-4 col-lg-5 col-xl-6 rounded bg d-none d-lg-block">

            </div>
            <div className="col bg-white p-2 rounded-end position-relative">
                <div className="text-end pt-4">
                    <img src="./images/login.svg" style="height: 40px;" alt="">
                </div>
                <h2 className="text-center py-5">Bienvenidos</h2>

                <form action="#">
                    <div className="mb-4">
                        <label for="email" className="form-label">Correo electronico</label>
                        <input type="email" name="email" className="form-control" required>
                    </div>
                    <div className="mb-4">
                        <label for="password" className="form-label">Contraseña</label>
                        <input type="password" name="password" className="form-control" required>
                    </div>
                    <div className="mb-4">
                        <input type="checkbox" name="conected" id="" className="form-check-input">
                        <label for="conected" className="form-check-label">Mantenerme conectado</label>
                    </div>
                    <div className="d-grid ">
                        <button type="submit" className="btn btn-primary">iniciar sesión</button>
                    </div>
                    <div className="my-3">
                        <span>¿No tienes una cuenta? <a href="#">Registrate</a></span> <br>
                        <span><a href="#">Recuperar contraseña</a></span>
                    </div>
                </form>

                <div className="container w-100 my-5">
                    <div className="row">
                        <div className="col-12 text-center">
                            <span>Iniciar sesión</span>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col">
                            <button className="btn btn-outline-primary w-100">
                                <div className="row">
                                    <div className="col-2">
                                        <i className="bi bi-facebook"></i>
                                    </div>
                                    <div className="col-10">
                                        Facebook
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div className="col">
                            <button className="btn btn-outline-danger w-100">
                                <div className="row">
                                    <div className="col-2">
                                        <i className="bi bi-google"></i>
                                    </div>
                                    <div className="col-10">
                                        Google
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

        );
};