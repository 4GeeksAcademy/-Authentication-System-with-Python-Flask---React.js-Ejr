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
			],
			providers: null,
			products: [
				{
					id_Product: "1",
					name_Product: "Vino tinto",
					id_Category: "Bebida",
					id_Provider: "1A",
					provider: "Mucho vino tinto",
					cantidad: "3"
				},
				{
					id_Product: "2",
					name_Product: "Vino blanco",
					id_Category: "Bebida",
					id_Provider: "1A",
					provider: "Mucho vino tinto",
					cantidad: "9"
				},
				{
					id_Product: "3",
					name_Product: "Vino tinto suave",
					id_Category: "Bebida",
					id_Provider: "1B",
					provider: "Distribuidora de vinos",
					cantidad: "20"
				},
				{
					id_Product: "4",
					name_Product: "Vino tinto amargo",
					id_Category: "Bebida",
					id_Provider: "1B",
					provider: "Distribuidora de vinos",
					cantidad: "14"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
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
			loadProviders: () => {
				fetch("https://3001-plum-catshark-11aarra7.ws-us03.gitpod.io/api/provider")
					.then(response => response.json())
					.then(response => setStore({ providers: response }));
			},
			insertData: data => {
				console.log(data);
				fetch(
					"https://3001-plum-catshark-11aarra7.ws-us03.gitpod.io/api/provider",

					{
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(data)
					}
				)
					.then(response => response.json())
					.then(data => {
						console.log("Success:", data);
						setStore({ providers: data });
					})
					.catch(error => {
						console.error("Error:", error);
					});
			},
			//Sección de funciones para página de reportes
			// Filtra productos por proveedor para reporte
			filterByProvider: provider_id => {
				const filterProducts = getStore().products.filter(item => {
					return item.id_Provider === provider_id;
				});
			}
		}
	};
};

export default getState;
