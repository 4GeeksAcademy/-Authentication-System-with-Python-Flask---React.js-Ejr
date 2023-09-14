const getState = ({ getStore, getActions, setStore }) => {



	return {
		store: {
			message: null,
			libros: [],
			librosDonados: [],
			usuarios: [],
			usuariosAdmin: [],

			registro: true,

		},
		actions: {
			// Use getActions to call a function within a fuction

			getLibros: () => {
				var requestOptions = {
					method: "GET",
					redirect: "follow",
				};
				fetch(
					"URL",
					requestOptions
				)
					.then((response) => response.json())
					.then((result) => setStore({ libros: result }))
					.catch((error) => console.log("error", error));
			},

			getLibrosDonados: () => {
				var requestOptions = {
					method: "GET",
					redirect: "follow",
				};
				fetch(
					"URL",
					requestOptions
				)
					.then((response) => response.json())
					.then((result) => setStore({ librosDonaods: result }))
					.catch((error) => console.log("error", error));
			},

			getUsuarios: () => {
				var requestOptions = {
					method: "GET",
					redirect: "follow",
				};
				fetch(
					"URL",
					requestOptions
				)
					.then((response) => response.json())
					.then((result) => setStore({ usuarios: result }))
					.catch((error) => console.log("error", error));
			},

			getUsuariosAdmin: () => {
				var requestOptions = {
					method: "GET",
					redirect: "follow",
				};
				fetch(
					"URL",
					requestOptions
				)
					.then((response) => response.json())
					.then((result) => setStore({ usuarios: result }))
					.catch((error) => console.log("error", error));
			},



			postLibro: (nuevoLibro) => {
				console.log(nuevoLibro)
				const actions = getActions();
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify(nuevoLibro);

				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: raw,
					redirect: 'follow'
				};

				fetch("URL", requestOptions)
					.then((response) => response.json())
					.then((result) => {
						actions.getlibros();
						/* console.log(result); */
					})
					.catch((error) => console.log('error', error));
			},

			deleteLibros: (index) => {
				const actions = getActions();
				const currentLibro = getStore().libros;
				const selectedLibro = currentLibro[index];

				const requestOptions = {
					method: "DELETE",
					redirect: "follow",
				};

				fetch(
					`URL/${selectedLibro.id}`,
					requestOptions
				)
					.then((response) => response.json())
					.then((result) => {
						console.log("Book deleted from API:", result);
						actions.getLibros();
					})
					.catch((error) => console.log("Error deleting contact:", error));
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


			vistaRegistro: () => {
				setStore({ registro: false })
				console.log(getStore().registro)
			}
		}
	};
};

export default getState;
