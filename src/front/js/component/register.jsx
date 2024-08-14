import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { Context } from "../store/appContext";

// Validación con Yup
const validationSchema = Yup.object({
	nombre: Yup.string().min(3, '3 characters').required('Nombre requerido'),
	apellido: Yup.string().required('Apellido requerido'),
	fecha_de_nacimiento: Yup.date().required('Fecha de nacimiento requerida'),
	codigo_de_area: Yup.string().max(4, '4 characters').required('Código de área requerido'),
	telefono: Yup.string().required('Teléfono requerido'),
	correo: Yup.string().email('Email inválido').required('Email requerido'),
	clave: Yup.string().min(7, '7 characters').required('Contraseña requerida'),
	checkTerminos: Yup.boolean().oneOf([true], 'Debe aceptar los términos y condiciones')
});

export const Register = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);


	// handle registration

	const handleSubmit = (event) => {
		event.preventDefault();


		formik.handleSubmit();
	};

	// Formik
	const clientID = "715425283913-rjqjvf4uv4d78qc39hip0pdctti1mcja.apps.googleusercontent.com"

	useEffect(() => {
		const start = () => {
			gapi.auth2.init({
				clientId: clientID
			})
		}
		gapi.load("client:auth2", start)
	}, [])

	const onSuccess = (response) => {
		console.log(response)
		//conectar con los actions de flux para registrar usuario y luego con la base de datos
	}

	const onFailure = () => {
		console.log('Algo salió mal')
	}

	const formik = useFormik({
		initialValues: {
			nombre: '',
			apellido: '',
			fecha_de_nacimiento: '',
			codigo_de_area: '',
			telefono: '',
			correo: '',
			clave: '',
			checkTerminos: false
		},
		validationSchema,
		onSubmit: async (values) => {
			console.log(values);

			const registro = await actions.register(values.nombre, values.apellido, "1990-01-01", values.codigo_de_area, values.telefono, values.correo, values.clave)
			if (registro) {
				navigate('/vista-login')
			}

		}
	});

	return (

		<div className="form-container mb-3  border border-3 rounded p-4">
			<p className="title fw-semibold text-secondary text-center">Registrarse</p>
			<form className="row g-3 d-flex" onSubmit={formik.handleSubmit}>
				<div className="col-md-6">
					<input
						type="text"
						className="form-control"
						name="nombre"
						placeholder="Nombre:"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.nombre}
					/>
					{formik.touched.nombre && formik.errors.nombre ? (
						<div className="text-danger">{formik.errors.nombre}</div>
					) : null}
				</div>

				<div className="col-md-6">
					<input
						type="text"
						className="form-control"
						name="apellido"
						placeholder="Apellido:"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.apellido}
					/>
					{formik.touched.apellido && formik.errors.apellido ? (
						<div className="text-danger">{formik.errors.apellido}</div>
					) : null}
				</div>

				<div className="col-md-6">
					<label htmlFor="fecha_de_nacimiento" className="form-label text-start">
						Fecha de nacimiento:
					</label>
					<input
						type="date"
						className="form-control"
						name="fecha_de_nacimiento"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.fecha_de_nacimiento}
					/>
					{formik.touched.fecha_de_nacimiento && formik.errors.fecha_de_nacimiento ? (
						<div className="text-danger">{formik.errors.fecha_de_nacimiento}</div>
					) : null}
				</div>

				<div className="col-md-6">
					<label htmlFor="codigo_de_area" className="form-label text-start">
						Código de Área:
					</label>
					<input
						list="codigos-pais"
						className="form-control"
						id="codigo_de_area"
						name="codigo_de_area"
						placeholder="+589"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.codigo_de_area}
					/>
					{formik.touched.codigo_de_area && formik.errors.codigo_de_area ? (
						<div className="text-danger">{formik.errors.codigo_de_area}</div>
					) : null}

					<datalist id="codigo_de_area">
						<option value="+54">Argentina</option>
						<option value="+56">Chile</option>
						<option value="+57">Colombia</option>
						<option value="+52">México</option>
						<option value="+595">Paraguay</option>
						<option value="+51">Perú</option>
						<option value="+589">Uruguay</option>
						<option value="+58">Venezuela</option>
					</datalist>
				</div>

				<div className="col-md-6">
					<input
						type="text"
						className="form-control"
						name="telefono"
						placeholder="Teléfono:"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.telefono}
					/>
					{formik.touched.telefono && formik.errors.telefono ? (
						<div className="text-danger">{formik.errors.telefono}</div>
					) : null}
				</div>

				<div className="col-md-6">
					<input
						type="email"
						className="form-control"
						name="correo"
						placeholder="correo:"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.correo}
					/>
					{formik.touched.correo && formik.errors.correo ? (
						<div className="text-danger">{formik.errors.correo}</div>
					) : null}
				</div>

				<div className="col-md-6">
					<input
						type="password"
						className="form-control"
						name="clave"
						placeholder="Password:"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.clave}
					/>
					{formik.touched.clave && formik.errors.clave ? (
						<div className="text-danger">{formik.errors.clave}</div>
					) : null}
				</div>

				<div className="col-md-12 d-flex align-items-center">
					<input
						className="form-check-input me-2"
						type="checkbox"
						id="checkboxNoLabel"
						name="checkTerminos"
						aria-label="Términos y condiciones"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.checkTerminos}
					/>
					{formik.touched.checkTerminos && formik.errors.checkTerminos ? (
						<div className="text-danger">{formik.errors.checkTerminos}</div>
					) : null}
					<span>He leído y acepto los términos y condiciones de uso.</span>
				</div>

				<div className="col-md-12 d-flex justify-content-center">
					<button className="btn btn-primary btn-login-registro" type="submit">
						Registrarme
					</button>
				</div>
			</form>

			<div className="buttons-container d-flex justify-content-center mt-2">
				<GoogleLogin className="btn-login-registro d-flex justify-content-center" clientId={clientID} onSuccess={onSuccess} onFailure={onFailure} cookiePolicy="single_host_policy" />
			</div>

			<div className="linea-divisoria d-flex align-items-center my-3">
				<span className="linea flex-grow-1"></span>
				<span className="circulo mx-3"></span>
				<span className="linea flex-grow-1"></span>
			</div>

			<p className="sign-up-label mt-3 text-center">
				¿Ya tienes una cuenta?
				<Link to="/vista-login" className="login__forgot m-3">
					Inicia sesión
				</Link>
			</p>
			
		</div>

	);
};