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
					let storageUserId = localStorage.getItem("user_id");
					let storageRoleId = localStorage.getItem("role_id");
			
					if (!storageToken || !storageUserId || !storageRoleId) {
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
						console.error("Invalid token response status:", resp.status);
						localStorage.removeItem("token");
						localStorage.removeItem("role_id");
						localStorage.removeItem("user_id"); 
						setStore({ token: null, userId: null, roleId: null });
						return false;
					}
			
					let data = await resp.json();
					setStore({ token: storageToken, userId: storageUserId, roleId: storageRoleId });
					return true;
				} catch (error) {
					console.error("Error loading session:", error);
					localStorage.removeItem("token");
					localStorage.removeItem("role_id");
					localStorage.removeItem("user_id");
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
				localStorage.removeItem("token");
				localStorage.removeItem("role_id");
				localStorage.removeItem("user_id");
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
