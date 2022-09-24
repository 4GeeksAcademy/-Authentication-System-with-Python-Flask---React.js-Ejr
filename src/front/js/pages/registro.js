import React, { useContext } from "react";
import {useForm} from 'react-hook-form'; 
import { Context } from "../store/appContext";
import dinero from "../../img/dinero.png";
import avatar from "../../img/avatar.png";
import "../../styles/registro.css";
import { Link } from "react-router-dom";
import {NavbarRegistro} from "../component/navbar-registro";

export const Registro = () => {
	const { store, actions } = useContext(Context);
    
    const {register,errors,handleSubmit} = useForm ();

	const onSubmit = (data) => {
		console.log(data)
	}

	return (
		<>
		<NavbarRegistro/>
			<div className="d-flex justify-content-around my-4">
				<div id="imagen-comentario" className="d-flex flex-column align-items-center">
					<img id="img-envio" src={dinero} alt="envio de dinero al exterior" style={{width:"500px",height:"500px" }}/>
					<div className="d-flex">
						<img id="avatar" src={avatar} alt="persona que da el dialogo" />
						<div className="speech-bubble">Regístrate gratis con nosotros, compara entre las más conocidas casas de cambio del país y elige la mejor opción para TI.</div>
					</div>
				</div>
				<div>
					<form id="formulario" className="" onSubmit={handleSubmit(onSubmit)}>
						<h3 id="title" className="my-3">Regístrate</h3>
						<div className="mb-3">
							<label id="info-name" for="exampleInputName" className="form-label">Ingresa tu nombre y apellido</label>
							<input type="text" className="form-control" id="name" name="nombre" ref={register({required:true, maxLength:20,message:'Campo obligatorio'})}/>
						</div>
						<div className="mb-3">
							<label id="email" for="exampleInputEmail1" className="form-label">Correo Electronico</label>
							<input type="email" name="mail" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={register({required:true, message:'Campo obligatorio'})} />
						</div>
						<div className="mb-3">
							<label id="password" for="exampleInputPassword1" className="form-label">Contraseña</label>
							<input type="password" name="contraseña" className="form-control" id="exampleInputPassword1" ref={register({required:true, min: 8, max:12, message:'Campo obligatorio'})}/>
						</div>
						<div className="mb-3">
							<label id="c-password" for="exampleInputPassword1" className="form-label">Confirma tu contraseña</label>
							<input type="password" name="contraseña" className="form-control" id="exampleInputPassword1" ref={register({required:true, min: 8, max:12, message:'Campo obligatorio'})}/>
						</div>
						<div className="mb-3">
							<label id="info-number" for="exampleInputNumber" className="form-label">Número Telefónico</label>
							<input type="number" name="telefono" className="form-control" id="number" placeholder="+56 9" ref={register({required:true, min: 9, max:12, message:'Campo obligatorio'})}/>
						</div>
						<Link to="/home"><button type="submit" id="boton">Crear Usuario</button></Link>

					</form>
				</div>
			</div>
		</>
	);
};
