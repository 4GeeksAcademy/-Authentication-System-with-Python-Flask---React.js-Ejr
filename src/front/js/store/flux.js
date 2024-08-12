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
					const storageToken = localStorage.getItem("token");
					const storageUserId = localStorage.getItem("user_id");
					const storageRoleId = localStorage.getItem("role_id");
			
					if (!storageToken || !storageUserId || !storageRoleId) {
						localStorage.clear(); 
						setStore({ token: null, userId: null, roleId: null });
						return false;
					}
			
					let resp = await fetch(apiUrl + "/pinguser", {
						mode: 'no-cors',
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + storageToken,
							"Access-Control-Allow-Origin": "*"
						},
					});
			
					if (!resp.ok) {
						localStorage.clear(); 
						setStore({ token: null, userId: null, roleId: null });
						return false;
					}
			
					const data = await resp.json();
					localStorage.setItem("token", data.access_token);
					localStorage.setItem("role_id", data.role_id);
					localStorage.setItem("user_id", data.user_id); 
					setStore({ token: data.access_token, userId: data.user_id, roleId: data.role_id });
					return true;
				} catch (error) {
					console.error("Error loading session:", error);
					localStorage.clear();
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
				localStorage.setItem("user_id", data.user_id); 
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
				localStorage.clear();
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

			//////////////////////////////////////////////////////////////////////////////////////////////////////// manejo envio mails

			SendMail: async (trydata) => {
				try{
					const response = await fetch('https://api.brevo.com/v3/smtp/email', {
						method: 'POST',
						headers: {
							'accept': 'application/json',
							'Content-Type': 'application/json',
							'api-key': process.env.MAILAPIKEY
						},
						  body: JSON.stringify(trydata)
						});
						if (response.ok){
							//mail enviado con exito
						}
					}
					catch (error) {
							console.error("Error:", error);
					}
			},
			//////////////////////////////////////////////////////////////////////////////////////////////////////// manejo envio mails

	};
};

export default getState;
