const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: [
				{
					"id": "",
					"role":"",
					"username": "",
					"name": "",
					"lastname": "",
					"dni" :"",
					"email": "",
					"phone" :"",
					"password": "",
					"virtual_link": "",
					"is_active": "",
				},
			],
		},
		actions: {
			protectedFetch: async (endpoint, method = "GET", body = null) => {
				const token = localStorage.getItem("token")
				if (!token) return jsonify({ "error": "Token not found." })
				try {
					let params = {
						method,
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Authorization": "Bearer " + token
						}
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
			createUser: async (body) => {
				try {
					if (!body.username || !body.name || !body.lastname || !body.dni || !body.phone || !body.email) {
						throw new Error("Por favor, complete todos los campos requeridos.");
					}
					const role_id = 2; 
					const resp = await fetch(process.env.BACKEND_URL + "api/signup", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin':'*'
						},
						body: JSON.stringify(body),
					});
			
					if (resp.ok) {
						const data = await resp.json();
						const newUser = {
							id: data.role_id,
							username: data.username,
							name: data.name,
							lastname: data.lastname,
							dni: data.dni,
							phone: data.phone,
							email: data.email,
							virtual_link: data.virtual_link
						};
						const updatedUserList = [...getStore().user, newUser];
						setStore({ user: updatedUserList });
						return data;
					} else {
						const errorMessage = await resp.text(); 
						throw new Error(errorMessage || "Error al crear el usuario.");
					}
				} catch (error) {
					console.error("Error creating user:", error);
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
			getUsers: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "api/users", {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Authorization': 'Bearer ' + localStorage.getItem("token")
                        }
                    });
                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({ user: data }); 
                        return data;
                    } else {
                        throw new Error("Error al obtener usuarios.");
                    }
                } catch (error) {
                    console.error("Error al obtener usuarios:", error.message);
                    throw error;
                }
            },
			getUser: async (id) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `api/get_user/${id}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
							'Authorization': 'Bearer ' + localStorage.getItem("token")
						}
					});
					if (resp.ok) {
						const data = await resp.json();
						return data;
					} else {
						throw new Error("Error al obtener el usuario.");
					}
				} catch (error) {
					console.error("Error al obtener usuarios:", error.message);
					throw error;
				}
			},
			editUser: async (id, userData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `api/edit_user/${id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
							'Authorization': 'Bearer ' + localStorage.getItem("token")
						},
						body: JSON.stringify(userData)
					});
					if (resp.ok) {
						const userIndex = getStore().user.findIndex(user => user.id === id);
						if (userIndex !== -1) {
							const updatedUsers = [...getStore().user];
							updatedUsers[userIndex] = {...userData, id};
							setStore({ user: updatedUsers });
							return {...userData, id};
						} else {
							throw new Error('Usuario no encontrado');
						}
					} else {
						throw new Error('Error al editar el usuario');
					}
				} catch (error) {
					console.error("Error al editar el usuario:", error.message);
					throw error; 
				}
			}
		}
	};
};

export default getState;
