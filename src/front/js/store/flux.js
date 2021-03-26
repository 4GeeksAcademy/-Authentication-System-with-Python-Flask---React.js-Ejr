import React, { useContext, useState, useEffect } from "react";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			newContact: [],

			login_data: {
				userLogin: "",
				userPass: ""
			}
		},

		actions: {
			onChangeLogin: e => {
				const store = getStore();
				const { login_data } = store;
				login_data[e.target.name] = e.target.value;
				setStore({ login_data });
				console.log(store.login_data);
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
			addComment: async commentText => {
				e.preventDefault();
				try {
					const response = await fetch("http://0.0.0.0:3001/Comments", {
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
			}
		}
	};
};
export default getState;
