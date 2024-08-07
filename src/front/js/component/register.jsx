import React from "react";
import { Link } from "react-router-dom";



export const Register = () => {
	return (
		<div className="form-container text-center mb-3 border border-3 rounded">
			<p className="title fw-semibold text-opacity-75">Registrarse</p>
			<form className="form">
				<input type="text" className="input" placeholder="Nombre:" />
				<input type="text" className="input" placeholder="Apelldo:" />
				<input type="date" className="input" placeholder="Fecha de nacimiento:" />
				<label htmlFor="codigo-pais" className="d-inline-flex p-2">Código de Área:</label>
				<input list="codigos-pais" id="codigo-pais" name="codigo-pais" placeholder="+589" />
				<datalist id="codigos-pais">
					<option value="+1">EE.UU</option>
					<option value="+34">España</option>
					<option value="+52">México</option>
					<option value="+44">Reino Unido</option>
					<option value="+589">Uruguay</option>
				</datalist>
				<input type="text" className="input" placeholder="Teléfono:" />
				<input type="email" className="input" placeholder="Email" />
				<input type="password" className="input" placeholder="Password" />
				<div className="">
					<input className="form-check-input me-2" type="checkbox" id="checkboxNoLabel" value="" aria-label="Términos y condiciones" />
					<span>
						He leído y acepto los términos y condiciones de uso.
					</span>
				</div>
				<button className="form-btn justify-content-center" type="submit">Siguiente</button>
			</form>
			<p className="sign-up-label">
				Ya tienes una cuenta?<Link to="/vista-login" className="login__forgot m-3">Inicia sesión</Link>
			</p>
			<div class="linea-divisoria">
				<span class="linea"></span>
				<span class="circulo"></span>
				<span class="linea"></span>
			</div>
			<div className="buttons-container">
				<button className="button mt-4 justify-content-center">
					<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
						<path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
						<path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
						<path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
						<path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
					</svg>
					Continuar con Google
				</button>
			</div>
		</div>

	);
};