import emailjs from "emailjs-com";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			login_data: {
				userLogin: "",
				userPass: ""
			},
			recovery_data: {
				userEmail: "",
				userToken: ""
			},
			user: {
				token: "",
				email: ""
				//id: ""
			},
			Favoritos: {
				id_user: "",
				id_servicio_registrados: "",
				name_servicio: ""
			},
			serviceInfo: []
		},

		actions: {
			getServiceInfo: () => {
				fetch(`process.env.BACKEND_URL/servicio-registrados`, {
					method: "GET",
					headers: { "Content-Type": "application/json" }
				})
					.then(resp => resp.json())
					.then(data => {
						console.log(data);
						setStore({ serviceInfo: data });
					})
					.catch(error => console.log("Error loading message from backend", error));
			},
			addFavorioto: item => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "/favoritos", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id_users: store.id,
						id_servicio_registrados: store.id_servicio_registrados,
						name_servicio: store.name_servicio
					})
				})
					.then(resp => resp.json())
					.then(data => {
						console.log({ "--favoritos--": json });
						setStore({ Favoritos: json });
					})
					.catch(error => console.log("Error loading message from backend", error));
			},

			eliminaFavorioto: id => {
				console.log(id);
				const store = getStore();
				const newList = store.favoritos.filter(item => item.id !== id);
				setStore({
					Favoritos: newList
				});
				fetch(`process.env.BACKEND_URL/favoritos/${id}`, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" }
				})
					.then(resp => resp.json())
					.then(data => {
						console.log(json);
					});
			},

			getToken: () => {
				const tokenLocal = localStorage.getItem("token");
				const userLocal = JSON.parse(localStorage.getItem("user"));
				setStore({
					user: {
						token: tokenLocal,
						user: userLocal
					}
				});
				console.log("-->", tokenLocal);
				console.log("-->", JSON.stringify(userLocal));
			},

			addComment: async commentText => {
				e.preventDefault();
				try {
					const response = await fetch(process.env.BACKEND_URL + "/comments", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							comment_text: `${commentText}`
						})
					});
					const json = await response.json();
					console.log(json);
					//setStore({ newContact: JSON.stringify(json) });
					getActions().listComments();
				} catch (error) {
					console.log(error);
				}
			},
			listComments: async () => {
				e.preventDefault();
				try {
					const response = await fetch(process.env.BACKEND_URL + "/comments", {
						method: "GET",
						headers: { "Content-Type": "application/json" }
					});
					const json = await response.json();
					console.log(json);
					setStore({ Comments: JSON.stringify(json) });
				} catch (error) {
					console.log(error);
				}
			},
			setRegister: user => {
				console.log(user);
				fetch(process.env.BACKEND_URL + "/api/register", {
					method: "POST",
					body: JSON.stringify(user),
					headers: { "Content-type": "application/json" }
				})
					.then(resp => resp.json())
					.then(data => {
						console.log("--data--", data);
						setStore({ user: data });

						if (typeof Storage !== "undefined") {
							localStorage.setItem("token", data.token);
							localStorage.setItem("user", JSON.stringify(data.email));
							localStorage.setItem("tipo_user", JSON.stringify(data.tipo_user));
						}
					})
					.catch(error => console.log("error creating account in the backend", error));
			},
			setLogin: user => {
				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					body: JSON.stringify(user),
					headers: { "Content-type": "application/json" }
				})
					.then(resp => resp.json())
					.then(data => {
						console.log("--data--", data);
						setStore({ user: data });
						if (typeof Storage !== "undefined") {
							localStorage.setItem("token", data.token);
							localStorage.setItem("user", JSON.stringify(data.email));
							localStorage.setItem("tipo_user", JSON.stringify(data.tipo_user));
						}
					})
					.catch(error => console.log("Error loading message from backend", error));
			},
			sendEmail: user => {
				fetch(process.env.BACKEND_URL + "/api/passwordrecovery1", {
					method: "POST",
					body: JSON.stringify(user),
					headers: { "Content-type": "application/json" }
				})
					.then(data => data.json())
					.then(data => {
						setStore({ recovery_data: data });
						console.log(data);
						const templateParams = {
							to_email: data.email,
							recovery_hash: data.recovery_hash
						};
						emailjs.send(
							"service_gtr9nn8",
							"template_xht2g6m",
							templateParams,
							"user_Lg37b3jwPEh5fSo53yOsV"
						);
					})
					.catch(error => console.log("Error sending email", error));
			}
		}
	};
};
export default getState;
