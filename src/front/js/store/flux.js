const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: {

			},
		},
		actions: {

			sendSignup: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
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
			}
		}
	}
};

export default getState;
