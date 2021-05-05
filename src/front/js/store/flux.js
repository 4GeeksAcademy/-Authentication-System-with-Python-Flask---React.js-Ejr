const getState = ({ getActions, setStore }) => {
	return {
		store: {
			alajuela: [],
			cartago: [],
			heredia: [],
			limon: [],
			puntarenas: [],
			sanjose: [],
			cantones: [],
			provincias: [],
			servicios: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadCantones: async () => {
				const response = await fetch("https://3001-gold-ant-kpv46sbr.ws-us03.gitpod.io/api/cantones", {
					method: "GET"
				});

				const data = await response.json();
				console.log("cantones", data);

				setStore({ cantones: data });
			},
			loadProvincias: async () => {
				const response = await fetch("https://3001-gold-ant-kpv46sbr.ws-us03.gitpod.io/api/provincias", {
					method: "GET"
				});

				const data = await response.json();
				console.log("provincias", data);

				setStore({ provincias: data });
			},
			loadServicios: async () => {
				const response = await fetch("https://3001-gold-ant-kpv46sbr.ws-us03.gitpod.io/api/servicios", {
					method: "GET"
				});

				const data = await response.json();
				console.log("servicios", data);

				setStore({ servicios: data });
			},
			loadAlajuela: async () => {
				const body = {
					provinciaID: 1
				};
				const url = "https://3001-gold-ant-kpv46sbr.ws-us03.gitpod.io/api/pymeprovincia";
				const response = await fetch(url, {
					method: "POST",
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json",
						mode: "no-cors",
						Accept: "*/*"
					}
				});

				const data = await response.json();

				/* console.log("test", data); */
				setStore({ alajuela: data });
			},
			loadCartago: async () => {
				const url = "https://3001-chocolate-mockingbird-ticd6xoq.ws-us03.gitpod.io/api/pymeprovincia";
				const response = await fetch(url);
				const data = await response.json();
				setStore({ cartago: data.results });
			},
			loadGuanacaste: async () => {
				const url = "https://3001-chocolate-mockingbird-ticd6xoq.ws-us03.gitpod.io/api/pymeprovincia";
				const response = await fetch(url);
				const data = await response.json();
				setStore({ guanacaste: data.results });
			},
			loadHeredia: async () => {
				const url = "https://3001-chocolate-mockingbird-ticd6xoq.ws-us03.gitpod.io/api/pymeprovincia";
				const response = await fetch(url);
				const data = await response.json();
				setStore({ heredia: data.results });
			},
			loadLimon: async () => {
				const url = "https://3001-chocolate-mockingbird-ticd6xoq.ws-us03.gitpod.io/api/pymeprovincia";
				const response = await fetch(url);
				const data = await response.json();
				setStore({ limon: data.results });
			},
			loadPuntarenas: async () => {
				const url = "https://3001-chocolate-mockingbird-ticd6xoq.ws-us03.gitpod.io/api/pymeprovincia";
				const response = await fetch(url);
				const data = await response.json();
				setStore({ puntarenas: data.results });
			},
			loadSanjose: async () => {
				const url = "https://3001-chocolate-mockingbird-ticd6xoq.ws-us03.gitpod.io/api/pymeprovincia";
				const response = await fetch(url);
				const data = await response.json();
				setStore({ sanjose: data.results });
			}
		}
	};
};

export default getState;
