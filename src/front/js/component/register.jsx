import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { Context } from "../store/appContext";

// Validación con Yup
const validationSchema = Yup.object({
	nombre: Yup.string().min(4, '4 characters').required('Nombre requerido'),
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
				navigate('/')
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
					<label htmlFor="fecha-de-nacimiento" className="form-label text-start">
						Fecha de nacimiento:
					</label>
					<input
						type="date"
						className="form-control"
						name="fechaDeNacimiento"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.fechaDeNacimiento}
					/>
					{formik.touched.fechaDeNacimiento && formik.errors.fechaDeNacimiento ? (
						<div className="text-danger">{formik.errors.fechaDeNacimiento}</div>
					) : null}
				</div>

				<div className="col-md-6">
					<label htmlFor="codigo-pais" className="form-label text-start">
						Código de Área:
					</label>
					<input
						list="codigos-pais"
						className="form-control"
						id="codigo-pais"
						name="codigoPais"
						placeholder="+589"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.codigoPais}
					/>
					{formik.touched.codigoPais && formik.errors.codigoPais ? (
						<div className="text-danger">{formik.errors.codigoPais}</div>
					) : null}

					<datalist id="codigos-pais">
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
						name="email"
						placeholder="Email:"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
					{formik.touched.email && formik.errors.email ? (
						<div className="text-danger">{formik.errors.email}</div>
					) : null}
				</div>

				<div className="col-md-6">
					<input
						type="password"
						className="form-control"
						name="password"
						placeholder="Password:"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
					/>
					{formik.touched.password && formik.errors.password ? (
						<div className="text-danger">{formik.errors.password}</div>
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

				<div className="col-md-12">
					<button className="btn btn-primary w-100" type="submit">
						Siguiente
					</button>
				</div>
			</form>

			<p className="sign-up-label mt-3 text-center">
				¿Ya tienes una cuenta?
				<Link to="/vista-login" className="login__forgot m-3">
					Inicia sesión
				</Link>
			</p>

			<div className="linea-divisoria d-flex align-items-center my-3">
				<span className="linea flex-grow-1"></span>
				<span className="circulo mx-3"></span>
				<span className="linea flex-grow-1"></span>
			</div>

			<div className="buttons-container d-flex justify-content-center">
				<GoogleLogin clientId={clientID} onSuccess={onSuccess} onFailure={onFailure} cookiePolicy="single_host_policy" />
			</div>
		</div>

	);
};