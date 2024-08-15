const apiUrl = process.env.BACKEND_URL + "/api";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			userId: null,
			roleId: null,
			setting: null,
			totalClients: null,
			totalAppointments: null,
			totalServices: null,
			totalCars: null,
		},
		actions: {
			loadSession: async () => {
				try {
					console.log("Iniciando loadSession");
			
					const storageToken = localStorage.getItem("token");
					console.log("Token recuperado:", storageToken);
			
					const storageUserId = localStorage.getItem("user_id");
					console.log("User ID recuperado:", storageUserId);
			
					const storageRoleId = localStorage.getItem("role_id");
					console.log("Role ID recuperado:", storageRoleId);
			
					if (!storageToken || !storageUserId || !storageRoleId) {
						console.log("Faltan datos en localStorage");
						localStorage.clear(); 
						setStore({ token: null, userId: null, roleId: null });
						return false;
					}
			
					console.log("Datos en localStorage correctos, haciendo ping al usuario...");
			
					let resp = await fetch(apiUrl + "/pinguser", {
						// mode: 'no-cors',
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + storageToken,
							// "Access-Control-Allow-Origin": "*"
						},
					});
			
					console.log("Respuesta del servidor:", resp);
			
					if (!resp.ok) {
						console.log("Fallo en el ping al usuario, status:", resp.status);
						localStorage.clear(); 
						setStore({ token: null, userId: null, roleId: null });
						return false;
					}
			
					const data = await resp.json();
					console.log("Datos recibidos del servidor:", data);
			
					const updateTokenAndState = (token, userId, roleId) => {
                        setStore({ token, userId, roleId });
                        localStorage.setItem("token", token);
                        localStorage.setItem("user_id", userId);
                        localStorage.setItem("role_id", roleId);
                    };
					
					updateTokenAndState(data.access_token, data.user_id, data.role_id);

					console.log("Sesión cargada con éxito");
					return true;
				} catch (error) {
					console.error("Error al cargar la sesión:", error);
					localStorage.clear();
					setStore({ token: null, userId: null, roleId: null });
					return false;
				}
			},
			
			
			login: async (email, password) => {
				let resp = await fetch(apiUrl + "/login", {
				  method: "POST",
				  body: JSON.stringify({ email, password }),
				  headers: {
					"Content-Type": "application/json",
				  },
				});
				if (!resp.ok) {
				  setStore({ token: null });
				  console.error("Error al hacer login:", errorData);
				  return { success: false, message: errorData.error || "Error desconocido" };
				};

				let data = await resp.json();
				// const token = data.access_token;
				setStore({ token: data.access_token });
				localStorage.setItem("token", data.access_token);
				localStorage.setItem("role_id", data.role_id);
				localStorage.setItem("user_id", data.user_id);
				return { success: true };
			  }, catch (error) {
				console.error("Error en la solicitud de login:", error);
				return { success: false, message: "Error en la red o en el servidor" };
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
				try {
					let { token } = getStore();
					if (!token) {
						console.warn("No hay token disponible para hacer logout");
						return false;
					}
			
					let resp = await fetch(apiUrl + "/logout", {
						method: "POST",
						headers: {
							"Authorization": "Bearer " + token,
						},
					});
					localStorage.clear();
					setStore({ token: null, userId: null, roleId: null });
					
					if (!resp.ok) {
						console.error("Error en la solicitud de logout:", resp.statusText);
						return false;
					}
					
					localStorage.clear();
					setStore({ token: null, userId: null, roleId: null });
					return true;
			
				} catch (error) {
					localStorage.clear();
					setStore({ token: null, userId: null, roleId: null });
					return false;
				}
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
			},
			saveCarDetails: async (carId, updatedCar) => {
				let { token } = getStore();
				try {
					let resp = await fetch(`${apiUrl}/cars/${carId}`, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + token,
						},
						body: JSON.stringify(updatedCar),
					});
			
					if (!resp.ok) {
						const errorData = await resp.json();
						return { success: false, error: errorData };
					}
			
					const data = await resp.json();
					return { success: true, data: data };
				} catch (error) {
					console.error("Error updating car details:", error);
					return { success: false, error: error.message };
				}
			},
		
			//////////////////////////////////////////////////////////////////////////////////////////////////////// manejo envio mails
			SendMail: async (data) => {
				console.log(data)
				try{
					const response = await fetch('https://api.brevo.com/v3/smtp/email', {
						method: 'POST',
						headers: {
							'accept': 'application/json',
							'api-key': process.env.MYKEY,
							'Content-Type': 'application/json'
							
						},
						  body: JSON.stringify(data)
						});
						if (response.ok){
							//mail enviado con exito
						}
					}
					catch (error) {
							console.error("Error:", error);
					}
			},
			GetUser:async () => {
				try{
					const storageUserId = localStorage.getItem("user_id");
					console.log(storageUserId)
					const response = await fetch(`${apiUrl}/users/${storageUserId}`);
						
						if (!response.ok) throw new Error("Network response failed");
							
						const data = await response.json();

           				const { result } = data;
            			const email = result.email;
            			const name = result.name;

						return { email, name };
						
					} catch (error) {
						console.error("Error:", error);
					}
				},

		}
	}
			//////////////////////////////////////////////////////////////////////////////////////////////////////// manejo envio mail
};

export default getState;
