const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: [
				{
					"id": "",
					"role": "",
					"username": "",
					"name": "",
					"lastname": "",
					"birth_date": "",
					"email": "",
					"phone": "",
					"password": "",
					"virtual_link": "",
					"is_active": "",

				},
			],

		},
		actions: {
			apiFetch: async (endpoint, method = 'GET', body = null) => {
				try {
					let params = {
						method,
						headers: {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*",
						}
					}
					if (body != null) {
						params.body = JSON.stringify(body)
					}
					let resp = await fetch(process.env.BACKEND_URL + "api" + endpoint, params);
					if (!resp.ok) {
						console.error(resp.statusText)
						return { error: resp.statusText }
					}
					return await resp.json()
				} catch (error) {
					console.error("Error:", error)
				}
			},

			protectedFetch: async (endpoint, method = "GET", body = null) => {
				const token = localStorage.getItem("token")
				if (!token) return jsonify({ "error": "Token not found." })
				try {
					let params = {
						method,
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Authorization": "Bearer " + token
						},
					}
					if (body != null) {
						params.headers = {
							"Content-Type": "application/json"
						}
						params.body = JSON.stringify(body)
					}
					let resp = await fetch(process.env.BACKEND_URL + "api" + endpoint, params)
					if (!resp.ok) {
						console.error(resp.statusText)
						return { error: resp.statusText }
					}
				} catch (error) {
					return error
				}
			},

			logout: async () => {
				await getActions().protectedFetch("/logout", "POST", null)
				localStorage.removeItem("token")
			},

			loginUser: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/login", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*'
						},
						body: JSON.stringify({ email, password }),
					});
					if (resp.ok) {
						const data = await resp.json();
						localStorage.setItem("token", data.token);
						const updatedUserList = getStore().user.map(u => {
							if (u.email === data.email) {
								return { ...u, is_active: true };
							}
							return u;
						});
						setStore({ user: updatedUserList });
						setStore({ is_active: true });
						return data;
					} else {
						throw new Error("Credenciales invalidas.");
					}
				} catch (error) {
					console.error("Error en la autenticación:", error.message);
					throw new Error(error.message);
				}
			},

			createUser: async (username, email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/signup", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*'
						},
						body: JSON.stringify({ username, email, password }),
					});
					if (resp.ok) {
						const data = await resp.json();
						const newUser = {
							id: data.id,
							username: data.username,
							email: data.email,
							password: data.password,
							profile_picture: data.profile_picture,
							is_active: data.is_active
						};
						const updatedUserList = [...getStore().user, newUser];
						setStore({ user: updatedUserList });
						return data;
					} else {
						throw new Error("That email is already associated with an account.");
					}
				} catch (error) {
					console.log("Error creating user:", error);
					throw error;
				}
			},
			sendPasswordRecoveryRequest: async (emailInput, setRecoveryMessage, setError) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/recovery", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							'Access-Control-Allow-Origin': '*'
						},
						body: JSON.stringify({ email: emailInput }),
					});

					const responseData = await response.json();

					if (response.ok) {
						setRecoveryMessage(responseData.message);
					} else {
						throw new Error(responseData.error || "Error al enviar la solicitud de recuperación de contraseña.");
					}
				} catch (error) {
					console.error("Error al enviar la solicitud de recuperación de contraseña:", error);
					setError(error.message);
				}
			},

			editProfile: async (changes) => {
				try {
					const resp = await getActions().protectedFetch("/profile_edit", "PUT", changes)

					if (!resp.ok) {
						throw new Error("No se pudo actualizar el perfil")
					}

					return await resp.json()

				} catch (error) {
					console.error("Error al actualizar el perfil: ", error)
					throw error
				}
			}
		}
	};
};

export default getState;
