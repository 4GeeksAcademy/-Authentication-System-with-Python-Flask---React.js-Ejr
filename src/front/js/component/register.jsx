import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
	  onSubmit: async(values) => {
	  console.log(values);
	//   setNombreUsuario(values.nombre);
    //   setApellido(values.apellido);
    //   setFechaDeNacimiento(values.fecha_de_nacimiento);
    //   setCodigoDeArea(values.codigoPais);
    //   setTelefono(values.telefono);
    //   setCorreo(values.correo);
    //   setClave(values.clave);

		// fetchToRegister();
		const registro = await actions.register(values.nombre, values.apellido, "1990-01-01", values.codigo_de_area, values.telefono, values.correo, values.clave)
		if(registro){
			navigate('/')
		}
	}
	});
  
	return (
	  <div className="form-container mb-3 border border-3 rounded p-4">
		<p className="title fw-semibold text-secondary text-center">Registrarse</p>
		<form className="row g-3 d-flex" onSubmit={handleSubmit}>
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
			  name="correo"
			  placeholder="Email:"
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
			  placeholder="Contraseña:"
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
			  id="checkTerminos"
			  name="checkTerminos"
			  onChange={formik.handleChange}
			  onBlur={formik.handleBlur}
			  checked={formik.values.checkTerminos}
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
  
		<div className="buttons-container">
		  <button className="btn btn-light w-100 d-flex align-items-center justify-content-center">
			<svg
			  xmlns="http://www.w3.org/2000/svg"
			  preserveAspectRatio="xMidYMid"
			  viewBox="0 0 256 262"
			  width="20"
			  height="20"
			  className="me-2"
			>
			  <path
				fill="#4285F4"
				d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
			  ></path>
			  <path
				fill="#34A853"
				d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
			  ></path>
			  <path
				fill="#FBBC05"
				d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
			  ></path>
			  <path
				fill="#EB4335"
				d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
			  ></path>
			</svg>
			Continuar con Google
		  </button>
		</div>
	  </div>
	);
  };