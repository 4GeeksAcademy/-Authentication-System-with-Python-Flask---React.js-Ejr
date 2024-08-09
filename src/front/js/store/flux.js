const apiUrl = process.env.BACKEND_URL + "/api";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			userId: null,
			roleId: null,
		},
		actions: {
			loadSession: async () => {
				try {
					let storageToken = localStorage.getItem("token");
					if (!storageToken) {
						// Si no hay token en localStorage, asegúrate de limpiar el estado
						setStore({ token: null, userId: null, roleId: null });
						return false;
					}
			
					let resp = await fetch(apiUrl + "/pinguser", {
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + storageToken,
						},
					});
			
					if (!resp.ok) {
						// Si el token no es válido, limpiar el token del localStorage y el estado
						console.error("Invalid token response status:", resp.status);
						localStorage.removeItem("token");
						localStorage.removeItem("role_id");
						setStore({ token: null, userId: null, roleId: null });
						return false;
					}
			
					let data = await resp.json();
					localStorage.setItem("role_id", data.role_id);  // Almacenar role_id en localStorage
					setStore({ token: storageToken, userId: data.user_id, roleId: data.role_id });
					return true;
				} catch (error) {
					// Manejar errores de la solicitud fetch
					console.error("Error loading session:", error);
					localStorage.removeItem("token");
					localStorage.removeItem("role_id");
					setStore({ token: null, userId: null, roleId: null });
					return false;
				}
			},
			
			
			login: async (email, password) => {
				let resp = await fetch(apiUrl + "/login", {
					method: "POST",
					body: JSON.stringify({email, password }),
					headers: {
						"Content-Type" : "application/json",
					},
				});
				if (!resp.ok) {
					setStore({ token: null });
					return false;
				};
				let data = await resp.json();
				setStore({ token: data.access_token });
				localStorage.setItem("token", data.access_token);
				localStorage.setItem("role_id", data.role_id); 
				return true;
			},			
			signup: async (email, password, name, phone_number) => {
				let resp = await fetch(apiUrl + "/signupuser", {
					method: "POST",
					body: JSON.stringify({email, password, name, phone_number}),
					headers: {
						"Content-Type": "application/json",
					},
				});
				if(!resp.ok) {
					const errorData = await resp.json();
					return false;
				}
				let data = await resp.json();
					return true;
			},
			logout: async () => {
				let { token } = getStore();
				let resp = await fetch(apiUrl + "/logout", {
					method: "POST",
					headers: {
						Authorization: "Bearer " + token,
					},
				});
				if (!resp.ok) return false;
				setStore({ token: null, userId: null, roleId: null });
				localStorage.removeItem("token");
				localStorage.removeItem("role_id");
				return true;
			},
			
			saveProfile: async (updatedProfile) => {
				let { token } = getStore();
				let resp = await fetch(apiUrl + "/update_profile", {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					body: JSON.stringify(updatedProfile),
				});
				if (!resp.ok) {
					const errorData = await resp.json();
					return { success: false, error: errorData };
				}
				const data = await resp.json();
				return { success: true };
			}
		},
	};
};

export default getState;
