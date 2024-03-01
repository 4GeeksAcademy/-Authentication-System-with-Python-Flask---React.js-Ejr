import { useState } from "react";
import { element } from "prop-types";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: [],
			jivamuktiYoga: [],
			jivamuktiSessionInfo: {},
			vinyasaYoga: [],
			vinyasaSessionInfo: {},
			hathaYoga: [],
			rocketYoga: [],
			ashtangaYoga: [],
			meditation: [],
			harmonium: [],
			teachers: []
			// demo: [
			// 	{
			// 		title: "FIRST",
			// 		background: "white",
			// 		initial: "white"
			// 	},
			// 	{
			// 		title: "SECOND",
			// 		background: "white",
			// 		initial: "white"
			// 	}
			// ]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello") // Aqui se esta usando la variable de entorno
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			login: async (email, password) => {
				// console.log(email, password);
				// console.log("funciona")
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						// mode: 'cors',
						body: JSON.stringify({
							"email": email,
							"password": password
						})
					})
					let data = await response.json()
					if (response.status === 401) {
						return false;
					}
					localStorage.setItem("token", data.access_token)
					console.log(data);
					return true
				} catch (error) {
					console.log(error);
					return false
				}
			},
			getAllSessions: async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/yogatype");
                    console.log(response.status);
                    if (response.status === 200) {
                        const data = await response.json();
                        console.log(data);
                        setStore({ jivamuktiYoga: data.jivamukti_sessions, vinyasaYoga: data.vinyasa_sessions, hathaYoga: data.hatha_sessions, ashtangaYoga: data.ashtanga_sessions, rocketYoga: data.rocket_sessions, meditation: data.meditation_sessions, harmonium: data.harmonium_sessions});
                        return true;
                    } else {
                        throw new Error("Error fetching Yoga sessions");
                    }
                } catch (error) {
                    console.error(error);
                    return false;
                }
            },

			getOneJivamukti: async (jivamuktiId) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + `/api/jivamuktiyoga/${jivamuktiId}`, {
						method: "GET",
					});
					console.log(response.status);

					if (response.status === 200) {
						let data = await response.json();
						console.log(data);
						const jivamuktiSessionInfoWithId = {
							...data.jivamukti_session,
							jivamuktiId: jivamuktiId,
						};
						console.log("Updated session info:", jivamuktiSessionInfoWithId)
						setStore({ jivamuktiSessionInfo: jivamuktiSessionInfoWithId });
						return true
					} else {
						throw new Error("Error fetching Jivamukti yoga info");
					}
				} catch (err) {
					console.error(err);
					return false
				}
			},

			getOneVinyasa: async (vinyasaId) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + `/api/vinyasayoga/${vinyasaId}`, {
						method: "GET",
					});
					console.log(response.status);

					if (response.status === 200) {
						let data = await response.json();
						console.log(data);
						const vinyasaSessionInfoWithId = {
							...data.vinyasa_session,
							vinyasaId: vinyasaId,
						};
						console.log("Updated session info:", vinyasaSessionInfoWithId)
						setStore({ vinyasaSessionInfo: vinyasaSessionInfoWithId });
						return true
					} else {
						throw new Error("Error fetching Vinyasa yoga info");
					}
				} catch (err) {
					console.error(err);
					return false
				}
			},

			getAllTeachers: async () => 	{
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/theteachers");
					console.log(response.status);
			
					if (response.status === 200) {
						const data = await response.json();
						console.log(data);
						setStore({ teachers: data.theteachers });
						return true;
					} else {
						throw new Error("Error fetching teachers data");
					}
				} catch (error) {
					console.error(error);
					return false;
				}

			},

			
   
	    }	
	}	
};

export default getState;
