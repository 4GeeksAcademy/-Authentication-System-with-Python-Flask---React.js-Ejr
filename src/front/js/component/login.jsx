import React, { useEffect, useContext}from "react";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import { Context } from "../store/appContext";

import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";


export const Login = () => {

	const {strore, actions} = useContext(Context)

	const clientID = "715425283913-rjqjvf4uv4d78qc39hip0pdctti1mcja.apps.googleusercontent.com"

	useEffect(()=>{
		const start = () => {
			gapi.auth2.init({
				clientId: clientID
			})
		}
		gapi.load("client:auth2", start)
	}, [])
	const onSuccess = (response) => {
		console.log(response)
		//conectar con los actions de flux para hacer el login y luego con la base de datos.
	}
	const onFailure = () => {
		console.log('Algo salió mal')
	}

	const formik = useFormik({
			initialValues: {
				email: '',
				password: ''
			},
			validationSchema: Yup.object({
				email: Yup.string().required('Email requerido'),
				password: Yup.string().min(7, '7 characters').required('Contraseña requerida'),
				
			}),
			onSubmit: async (values) => {
				console.log(values);
				
				const login = await actions.iniciarSesion(values.email, values.password)
				if(!login.error) {
					Swal.fire({
						title: 'Bienvenido!',
						text: 'Ingresaste satisfactoriamente!',
						icon: 'success',
						timer: 2000
					  })
					  navigate("/")
				} else {
					Swal.fire({
						title: 'Lo sentimos!',
						text: 'Ha habido un error!',
						icon: 'error',
						timer: 2000
					  })
				}
			},
		});
		


	return (
		<div className="form-container2 text-center mb-3 border border-3 rounded">
			<form action="#" id="login-form" onSubmit={formik.handleSubmit}>
				<h2 className="title fw-semibold text-secondary">Iniciar sesión</h2>

				<div className="left">
					<input type="email" className="input m-2" name="email" placeholder="Email:"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email} />
					{formik.touched.email && formik.errors.email ? (
						<div className="text-danger">{formik.errors.email}</div>
					) : null}
					<input type="password" className="input m-2" name="password" placeholder="Password:"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password} />
					{formik.touched.password && formik.errors.password ? (
						<div className="text-danger">{formik.errors.password}</div>
					) : null}
					<div>
						<button type="submit" className="btn btn-primary mt-2">Iniciar sesión</button>
					</div>
				</div>
				<div className="right">
					<div className="p-2">
						<Link to="/" className="login__forgot m-3">Olvidé mi contraseña</Link>
					</div>
					<div className="buttons-container">
							<GoogleLogin clientId={clientID} onSuccess={onSuccess} onFailure={onFailure} cookiePolicy="single_host_policy"/>
					</div>
					<div className="linea-divisoria">
						<span className="linea"></span>
						<span className="circulo"></span>
						<span className="linea"></span>
					</div>
					<div className="p-2">
						<p className="sign-up-label">
							No tienes una cuenta?<Link to="/vista-register" className="login__forgot m-3">REGISTRATE</Link>
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};