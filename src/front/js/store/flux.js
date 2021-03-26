import React, { useContext, useState, useEffect } from "react";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			newContact: [],

			login_data: {
				userLogin: "",
				userPass: ""
			},
			user: {
				token: "",
				email: "",
				userId: ""
			}
		},

		actions: {
			addFavorioto: async () => {
				fetch(process.env.BACKEND_URL + "/favoritos", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id_users: store.id_user,
						id_servicio_registrados: store.id_servicio_registrados,
						name_servicio: store.name_servicio
					})
				})
					.then(resp => resp.json())
					.then(data => {
						console.log({ "--favoritos--": json });
						setStore({ favoritos: json });
					})
					.catch(error => console.log("Error loading message from backend", error));
            },
            
			eliminaFavorioto: async id => {
				console.log(id);
				const store = getStore();
				const newList = store.favoritos.filter(item => item.id !== id);
				setStore({
					favoritos: newList
				});
				fetch(`process.env.BACKEND_URL/favoritos/${id}`, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" }
				})
					.then(resp => resp.json())
					.then(data => {
                        console.log(json);
                    })    
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
