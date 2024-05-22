const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			vehicles: [],
			favorites: [],
			myVehicles: [],
			details: {},
			checkout: {},
			vehicles_home: []
		},
		actions: {
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
			login: async (email, password) => {
                try {
				const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
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
			logOut: () => {
				localStorage.removeItem('token');
				setStore({ 
					favorites: [],
					myVehicles: [] 
				});
			},
			signup: async (email, password) => {
                try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					});
					if (response.status === 201) {
						return "success";
					} else if (response.status === 409) {
						return "email_exist";
					} else {
						return "incomplete_data"
					}
				} catch (error) {
					return false;
				}
			},
			addVehicle: async (marca_modelo, matricula, motor, tipo_cambio, asientos, precio) => {
				const token = localStorage.getItem("token")
                try {
			 		const response = await fetch(`${process.env.BACKEND_URL}/api/vehicle`, {
			 			method: 'POST',
			 			headers:{
			 				'Content-Type':'application/json',
			 				'Authorization': "Bearer " + token
			 			},
			 			body: JSON.stringify({
			 		 			marca_modelo: marca_modelo,
			 		 			matricula: matricula,
			 		 			motor: motor,
			 		 			tipo_cambio: tipo_cambio,
			 		 			asientos: parseInt(asientos),
			 					precio: parseInt(precio)
			 	 		})
                 	});
					if (response.status === 200) {
						return "success";
					} else if (response.status === 409) {
						console.log(2);
						return "plate_exist";
					} else {
						console.log(3);
						return "incomplete_data";
					}
				} catch (error) {
					return false;
				}
			},
      		getVehicles: async () => {
				const response = await fetch(`${process.env.BACKEND_URL}/api/vehicle`, {
					method: 'GET'
				})
				if (response.status === 200) {
					const data = await response.json();
					setStore({ vehicles: data.results })
				} else {
					return [];
				}	
			},
			getDetails: (id) => {
				fetch(`${process.env.BACKEND_URL}/api/vehicle/${id}`, {
					method: 'GET'
				})
				.then((response) => response.json())
				.then(data => {
					setStore({ details: data})
				})
				.catch((error) => console.log(error))
			},
			removeVehicle: async (vehicle_id) => {
				const token = localStorage.getItem("token")
                try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/vehicle/${vehicle_id}`, {
						method: 'DELETE',
						headers:{
							'Content-Type':'application/json',
							'Authorization': "Bearer " + token
						},
                	});
					if (response.status === 200) {
						let allVehicles = getStore().vehicles;
						let allFavorites = getStore().favorites;
						const newListVehicles = allVehicles.filter((vehicle) => vehicle.id !== vehicle_id);
						const newListFavorites = allFavorites.filter((favorite) => favorite.id !== vehicle_id);
						setStore({
							vehicles: newListVehicles,
							favorites: newListFavorites

						})
					}
				} catch (error) {
					return []; 
				}
			},
			favorites: async () => {
				const token = localStorage.getItem("token")
                try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/favorites`, {
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
					const response = await fetch(`${process.env.BACKEND_URL}/api/favorite/vehicle/${id}`, {
						method: 'POST',
						headers:{
							'Content-Type':'application/json',
							'Authorization': "Bearer " + token
						},
                	});
				 	if (response.status === 201) {
							let listFav = getStore().favorites;
							const allVehicles = getStore().vehicles;
							const newFav = allVehicles.filter((vehicle) => vehicle.id == id);
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
					const response = await fetch(`${process.env.BACKEND_URL}/api/favorite/vehicle/${id}`, {
						method: 'DELETE',
						headers:{
							'Content-Type':'application/json',
							'Authorization': "Bearer " + token
						},
                	});
					if (response.status === 200) {
						let listFav = getStore().favorites;
						const newListFav = listFav.filter((vehicle) => vehicle.id != id);
						setStore({favorites: newListFav})
					}
				} catch (error) {
					return []; 
				}
			},
			myVehiclesInRent: async () => {
				const token = localStorage.getItem("token")
                try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/rent`, {
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
							return backendVehicles.some((beVehicle) => vehicle.user_id == beVehicle.user_id);
						});
						setStore({myVehicles: filteredVehicles});
					} else {
						return [];
					}
                } catch (error) {
                    return []; 
                } 
            },
			totalpayment: (vehicle_id, marca_modelo, precio, days, precio_id_stripe) => {
				setStore({
					checkout: {
						vehicle_id: vehicle_id,
						marca_modelo: marca_modelo,
						precio: precio,
						days: days,
						precio_id_stripe: precio_id_stripe
					}
				})
			},
// INTEGRACION BD
			// getVehicles_Home: async () => {
			// 	const response = await fetch(`${process.env.BACKEND_URL}/api/vehicles_home`, {
			// 		method: 'GET'
			// 	})
			// 	if (response.status === 200) {
			// 		const data = await response.json();
			// 		setStore({ vehicles_home: data })
			// 	} else {
			// 		return [];
			// 	}	
			// },
		}
	};
};
export default getState;
