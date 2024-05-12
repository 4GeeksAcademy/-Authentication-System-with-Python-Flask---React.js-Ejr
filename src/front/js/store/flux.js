const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			vehicles: [],
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			favorites: [],
			myVehicles: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			login: async (email, password) => {
                try {
					const response = await fetch("https://fuzzy-goggles-pjrw5j7xg769h965g-3001.app.github.dev/api/login", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					});
					let data = await response.json()
					if (response.status === 200) {
						localStorage.setItem("token", data.access_token);
						return true;
					} else {
						return false
					}
				} catch (error) {
					return false;
				}
			},




































			// fetch de todos los vehículos en alquiler -> GET vehicles
			getVehicles: () => {
				console.log("Obtener vehiculos");
				fetch("https://fuzzy-goggles-pjrw5j7xg769h965g-3001.app.github.dev/api/vehicle", {
					method: 'GET'
				})
					.then(res => res.json())
					.then(data => setStore({ vehicles: data.results })
					)
					.catch((error) => console.log(error))
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "")
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
			logOut: () => {
				localStorage.removeItem('token');
				setStore({ favorites: [[], [], []] });
			},
			signup: async (email, password) => {
                try {
					const response = await fetch("https://fuzzy-goggles-pjrw5j7xg769h965g-3001.app.github.dev/api/signup", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					});
					if (response.status === 200) {
						return true;
					} else {
						return false
					}
				} catch (error) {
					return false;
				}
			},
		}
	};
};

export default getState;
