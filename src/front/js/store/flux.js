const getState = ({ getActions, setStore }) => {
	return {
		store: {
			alajuela: [],
			cartago: [],
			heredia: [],
			limon: [],
			puntarenas: [],
			sanjose: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			loadAlajuela: async () => {
				const body = {
					provinciaID: 1
				};
				const url = "https://3001-chocolate-mockingbird-ticd6xoq.ws-us03.gitpod.io/api/pymeprovincia";
				const response = await fetch(url, {
					method: "POST",
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json",
						mode: "no-cors",
						Accept: "*/*"
					}
				});
				console.log(response);

				const data = await response.json();
				setStore({ alajuela: data.results });
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
