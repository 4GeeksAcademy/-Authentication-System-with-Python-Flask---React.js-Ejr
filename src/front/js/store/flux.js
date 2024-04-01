const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
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

			getMyTasks: async () => {
				try {
					const token = localStorage.getItem("jwt-token");

					const resp = await fetch(process.env.BACKEND_URL + "/api/protected", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + token,
						},
					});

					if (!resp.ok) {
						throw new Error("Error al obtener los datos");
					}

					const data = await resp.json();
					console.log(data);
					return data;
				} catch (error) {
					console.error(error);
				}
			}
		}
	};
};

export default getState;
