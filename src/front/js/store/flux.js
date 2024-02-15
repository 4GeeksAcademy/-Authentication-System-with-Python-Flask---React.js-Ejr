const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: {

			},
		},
		actions: {

			sendSignup: async (username, email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ username, email, password }),
					});

					if (!resp.ok) {
						console.error("Error al registrarse.")
						return "Error al registrarse."
					}

					return "Registro exitoso.";


				} catch (error) {
					console.error("Error procesando los datos.")
					return "Error procesando los datos."
				}
			},

			checkLoginInfo: async (username, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ username, password })
					});

					if (!resp.ok) {
						console.error("Datos incorrectos.")
						return "Datos incorrectos."
					}

					const data = await resp.json()
					return data

				} catch (error) {
					console.error("Error comprobando credenciales.")
					return "Error al comprobar datos."
				}
			},

			sendPasswordRecoveryRequest: async (emailInput, setRecoveryMessage) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/recovery", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email: emailInput }),
					});

					if (!response.ok) {
						throw new Error("Error al enviar la solicitud de recuperación de contraseña.");
					}

					setRecoveryMessage("Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.");
					
				} catch (error) {
					console.error("Error al enviar la solicitud de recuperación de contraseña:", error.message);
				}
			},

			resetPassword: async (token, newPassword) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `/reset-password/${token}`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ new_password: newPassword })
					});

					if (!response.ok) {
						throw new Error('Failed to reset password');
					}

					return { success: true };
				} catch (error) {
					return { success: false, error: error.message };
				}
			}
		}
	}
};

export default getState;
