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
			}
		}
	};
};
export default getState;
