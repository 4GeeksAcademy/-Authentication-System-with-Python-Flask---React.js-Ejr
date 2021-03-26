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
