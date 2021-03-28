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
			// onChangeLogin: e => {
			// 	const store = getStore();
			// 	const { login_data } = store;
			// 	login_data[e.target.name] = e.target.value;
			// 	setStore({ login_data });
			// 	console.log(store.login_data);
			// },

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

			createContact: async (e, email, password, confirm, checked) => {
				e.preventDefault();
				try {
					const response = await fetch("http://0.0.0.0:3001/register", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: `${email}`,
							password: `${password}`,
							confirm: `${confirm}`,
							checked: `${checked}`
						})
					});
					const json = await response.json();
					console.log(json);
					setStore({ newContact: JSON.stringify(json) });
					getActions().getAgenda();
				} catch (error) {
					console.log(error);
				}
			},
			addComment: async text_comment => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/comentarios", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							id_servicios_prestados: 6,
							id_servicio_registrados: 1,
							text_comment: text_comment,
							evaluacion: 3
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
					const response = await fetch("http://0.0.0.0:3001/Comments", {
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
