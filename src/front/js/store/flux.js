const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			login_data: {
				userLogin: "",
				userPass: ""
			},
			user: {
				token: "12345",
				email: "yunjoug@gmail.com",
				id: "1"
			},
			favoritos: {
				id_user: "",
				id_servicio_registrados: "",
				name_servicio: ""
			},
			serviceInfo: []
		},

		actions: {
			getServiceInfo: async () => {
				try {
					const response = await fetch(`process.env.BACKEND_URL/servicio-registrados`, {
						method: "GET",
						headers: { "Content-Type": "application/json" }
					});
					const json = await response.json();
					console.log(json);
					setStore({ serviceInfo: JSON.stringify(json) });
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			addFavorito: async item => {
				const store = getStore();
				//setStore({ favoritos: [...store.favoritos, item] });
				try {
					const response = await fetch(process.env.BACKEND_URL + "/favoritos", {
						mode: "no-cors",
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							id_user: store.id,
							id_servicio_registrados: store.id_servicio_registrados,
							name_servicio: store.name_servicio
						})
					});
					const json = await response.json();
					console.log({ "--favoritos--": json });
					setStore({ favoritos: JSON.stringify(json) });
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			eliminaFavorito: async id => {
				const store = getStore();
				const newList = store.favoritos.filter(item => item.id !== id);
				setStore({
					favoritos: newList
				});
				try {
					const response = await fetch(`process.env.BACKEND_URL/favoritos/${id}`, {
						method: "DELETE",
						headers: { "Content-Type": "application/json" }
					});
					const json = await response.json();
					console.log(json);
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
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
					headers: { "Content-type": "application/json; charset=UTF-8" }
				})
					.then(resp => resp.json())
					.then(data => {
						console.log("--data--", data);
						setStore({ user: data });

						if (typeof Storage !== "undefined") {
							localStorage.setItem("token", data.token);
							localStorage.setItem("user", JSON.stringify(data.email));
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
							localStorage.setItem("email", data.email);
						}
					})
					.catch(error => console.log("Error loading message from backend", error));
			}
		}
	};
};
export default getState;
