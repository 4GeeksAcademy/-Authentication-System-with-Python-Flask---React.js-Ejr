import React from "react";
import "../../styles/login.css";

export const LoginScreen = () => {
	return (
		<div>
			<h3 className="auth__title">Login</h3>
			<form>
				<input
					className="auth__input"
					type="text"
					placeholder="email"
					name="email"
				/>
				<input
					className="auth__input"
					type="password"
					placeholder="contraseña"
					name="password"
				/>
				<button
					className="btn btn-formulario btn-block"
					type="submit"
					disabled={true}
				>
					Entrar
				</button>

				<div className="auth__social-networks">
					<p>Entar Usando Google</p>
					<div className="google-btn">
						<div className="google-icon-wrapper">
							<img
								className="google-icon"
								src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
								alt="google button"
							/>
						</div>
						<p className="btn-text">
							<b>Sign in with google</b>
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};
