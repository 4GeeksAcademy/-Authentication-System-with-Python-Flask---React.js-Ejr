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
			myVehicles: [],
			details: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			login: async (email, password) => {
                try {
					const response = await fetch("https://animated-robot-g4q69gpj4rrvfppvv-3001.app.github.dev/api/login", {
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
			añadirVehiculo: async (marca_modelo,matricula,motor,tipo_cambio,asientos,precio) => {
                 try {
			 		let response = await fetch(process.env.BACKEND_URL/api + "/api/agregarvehiculo", {
			 			method: 'POST',
			 			headers:{
			 				'Content-Type':'application/json',
			 				//'Authorization': "Bearer " + token
			 			},
			 			body: JSON.stringify({
			 		 			marca_modelo: marca_modelo,
			 		 			matricula: matricula,
			 		 			motor: motor,
			 		 			tipo_cambio: tipo_cambio,
			 		 			asientos: asientos,
			 					precio: precio
			 	 		})
                 	});
					 	if (response.ok){
							return "Vehículo añadido correctamente"; 
							//aqui se podría mostrar un modal con el mensaje
						} else {
							throw new Error("Error al añadir vehículo, todos los campos son obligatorios");
						}
				 } catch (error) {
					return error.message;
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
				setStore({ favorites: [[]] }); //linea de codigo para que te elimine el token y los favoritos desaparezcan
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
			getDetails: (id) => {
				fetch(`https://fuzzy-goggles-pjrw5j7xg769h965g-3001.app.github.dev/api/vehicle/${id}`, {
					method: 'GET'
				})
				.then((response) => response.json())
				.then(data => {
					setStore({ details: data})
				})
				.catch((error) => console.log(error))
			},
			favorites: async () => {
				const token = localStorage.getItem("token")
                try {
					const response = await fetch("https://fuzzy-goggles-pjrw5j7xg769h965g-3001.app.github.dev/api/user/favorites", {
						method: 'GET',
						headers:{
							'Content-Type':'application/json',
							'Authorization': "Bearer " + token
						},
                	});
					if (response.status === 200) {
						const data = await response.json();
						const vehicles = getStore().vehicles;
						const backendVehicles= data.results;
						const filteredVehicles = vehicles.filter((vehicle) => {
							return backendVehicles.some((beVehicle) => vehicle.id == beVehicle.vehicle_id);
						});
						setStore({favorites: filteredVehicles});
					} else {
						return [];
					}
                } catch (error) {
                    return []; 
                } 
            },
			addFav: async (id) => {
				const token = localStorage.getItem("token")
                try {
					const response = await fetch(`https://fuzzy-goggles-pjrw5j7xg769h965g-3001.app.github.dev/api/favorite/vehicle/${id}`, {
						method: 'POST',
						headers:{
							'Content-Type':'application/json',
							'Authorization': "Bearer " + token
						},
                	});
				 	if (response.status === 201) {
							let listFav = getStore().favorites;
							const allVehicles = getStore().vehicles;
							const newFav = allVehicles.filter((vehicle) => vehicle.id === id);
							const newListFav = listFav.concat(newFav) ;
							setStore({favorites: newListFav})
					} else {
						return [];
					}
                } catch (error) {
                    return []; 
                } 
			},
			removeFav: async (id) => {
				const token = localStorage.getItem("token")
                try {
					const response = await fetch(`https://fuzzy-goggles-pjrw5j7xg769h965g-3001.app.github.dev/api/favorite/vehicle/${id}`, {
						method: 'DELETE',
						headers:{
							'Content-Type':'application/json',
							'Authorization': "Bearer " + token
						},
                	});
					if (response.status === 200) {
						let listFav = getStore().favorites;
						const newListFav = listFav.filter((vehicle) => vehicle.id !== id);
						setStore({favorites: newListFav})
					}
				} catch (error) {
					return []; 
				} 
			}
		}
	};
};

export default getState;
