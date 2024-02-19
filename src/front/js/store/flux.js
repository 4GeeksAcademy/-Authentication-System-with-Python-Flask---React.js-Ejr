const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            user: [
				{	
					"id": "",
					"username": "",
					"email": "",
					"password": "",
					"profile_pictur": "",
					"is_active": ""
				}
			],
        },
        actions: {
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
						setStore({ isAuthenticated: true });
						return data;
					} else {
						throw new Error("Invalid credentials"); 
					}
				} catch (error) {
					console.error("Error en la autenticación:", error.message);
					throw new Error(error.message); 
				}
			},
			createUser : async (username, email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/signup", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin':'*'
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
					
					const responseData = await response.json(); // Parsear la respuesta JSON
					
					if (response.ok) {
						setRecoveryMessage(responseData.message); // Mostrar el mensaje de éxito
					} else {
						throw new Error(responseData.error || "Error al enviar la solicitud de recuperación de contraseña."); // Mostrar el mensaje de error del servidor, si está disponible
					}
				} catch (error) {
					console.error("Error al enviar la solicitud de recuperación de contraseña:", error);
					setError(error.message); // Mostrar un mensaje de error genérico en caso de un error no controlado
				}
			}
			
        }
    };
};

export default getState;
