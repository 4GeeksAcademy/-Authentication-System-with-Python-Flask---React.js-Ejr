import { Navigate, useNavigate } from "react-router-dom";

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

			productlist: [],

			
			user: [],
			users: [],
     		token: localStorage.getItem("token") || "",
			products: [],
			motoBrands: [],
			carBrands: [],
			allBrands: [],
			favorites: [],
			reviews: [],
			garages: [],
			garage: [],
			filters: [],
			filterProducts: [],
			status: []

		
		},

		actions: {

			getProduct: (productid) => {
				fetch(process.env.BACKEND_URL + `api/product/${productid}`)
				.then(resp => resp.json())
				.then((data) => {
					//onsole.log(data); 
					setStore({ productlist: [data] });

				})
				.catch(err => console.error(err))
			},

			login: async (email, password) => {
				const store = getStore();
				const opts = {
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${store.token}`
				  },
				  body: JSON.stringify({
					email: email,
					password: password
				  })
				};
			  
				try {
				  const resp = await fetch(`${process.env.BACKEND_URL}api/login`, opts);
				  const data = await resp.json();
				  localStorage.setItem("token", data.token);
				  setStore({ "token": data.token });
				  console.log(data);
				} catch (error) {
				  console.error(error);
				}
			  },

			getUser: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + `api/configuration`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then (response => response.json())
				.then ((response) => {
					setStore({user: response.data});
				});
			},

			getToken: () => {
				const store = getStore()
				if (localStorage.getItem("token")) {
				  return localStorage.getItem("token"); 
				}
				return store.token; 
			  },


			  getAllBrands: () => {
				fetch(process.env.BACKEND_URL + 'api/all-brands')
				  .then(response => response.json())
				  .then(response => {
					if (Array.isArray(response)) {
					  const brands = response.map(item => ({ ...item }));
					  setStore({ allBrands: brands });
					  console.log(brands);
					} else {
					  console.error('Error: La respuesta no es un array');
					}
				  })
				  .catch(error => {
					console.error('Error al obtener las marcas:', error);
				  });
			  },

			  getFilteredProducts: (brand_id, vehicle_type) => {
				fetch(`${process.env.BACKEND_URL}api/search-by/filter?brand_id=${brand_id}&vehicle_type=${vehicle_type}`)
				  .then(response => response.json())
				  .then(data => {
					// Almacenar los productos filtrados en store.filterProducts
					setStore({ filterProducts: data });
					console.log("se han recuperado los datos")
				  })
				  .catch(error => {
					// Manejar errores en la solicitud
					console.error('Error al obtener los productos filtrados:', error);
				  });
			  },
			  
			  setFilterProducts: (products) => {
				setStore({ filterProducts: products });
			  },
			
			//   login: async (email, password) => {
            //     const store = getStore()
            //     const opts = {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "Application/json",
            //             Authorization: Bearer ${store.token}
            //         },
            //         body: JSON.stringify({
            //             email: email,
            //             password: password
            //         })
            //     }
            //     const resp = await fetch(process.env.BACKEND_URL+"api/login", opts)
            //     const data = await resp.json()
            //     localStorage.setItem("token", data.token)
            //     setStore({"token": data.token})
            //     console.log(data)
            // },
			  
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
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

			getProductsOnSale: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "api/profile/products/ONSALE", {
					method: "GET",
					headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then(response => response.json())
				.then(response => {
					setStore({products: response})
				})
				.catch(error => {
					console.error(error);
				});
			},

			getProductsPendingBlocked: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "api/profile/products/PENDING_BLOCKED", {
					method: "GET",
					headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then(response => response.json())
				.then(response => {
					setStore({products: response})
				})
				.catch(error => {
					console.error(error);
				});
			},

			getProductsBlocked: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "api/profile/products/BLOCKED", {
					method: "GET",
					headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then(response => response.json())
				.then(response => {
					setStore({products: response})
				})
				.catch(error => {
					console.error(error);
				});
			},

			getProductsPendingSale: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "api/profile/products/PENDING_SALE", {
					method: "GET",
					headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then(response => response.json())
				.then(response => {
					setStore({products: response})
				})
				.catch(error => {
					console.error(error);
				});
			},

			getProductsSold: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "api/profile/products/SOLD", {
					method: "GET",
					headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then(response => response.json())
				.then(response => {
					setStore({products: response})
				})
				.catch(error => {
					console.error(error);
				});
			},

			PendingBlockedChanged: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "api/profile/changed/PENDING_BLOCKED", {
					method: "GET",
					headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then(response => response.json())
				.then(response => {
					setStore({products: response})
				})
				.catch(error => {
					console.error(error);
				});
			},

			BlockedChanged: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "api/profile/changed/BLOCKED", {
					method: "GET",
					headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then(response => response.json())
				.then(response => {
					setStore({products: response})
				})
				.catch(error => {
					console.error(error);
				});
			},

			PendingSaleChanged: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "api/profile/changed/PENDING_SALE", {
					method: "GET",
					headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then(response => response.json())
				.then(response => {
					setStore({products: response})
				})
				.catch(error => {
					console.error(error);
				});
			},

			SoldChanged: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "api/profile/changed/SOLD", {
					method: "GET",
					headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then(response => response.json())
				.then(response => {
					setStore({products: response})
				})
				.catch(error => {
					console.error(error);
				});
			},

			SoldReviewedChanged: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "api/profile/changed/SOLD_REVIEWED", {
					method: "GET",
					headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then(response => response.json())
				.then(response => {
					setStore({products: response})
				})
				.catch(error => {
					console.error(error);
				});
			},

			getStatusInfo: (product_id) => {
                const store = getStore();
                fetch(process.env.BACKEND_URL + `api/profile/product/${product_id}/status`, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then (response => response.json())
                .then(response => {
                    console.log(response)
                })
                .then(data => setStore({status: data}))
            },

			getGarages: () => {
                fetch(process.env.BACKEND_URL + 'api/garages' , {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
                })
                .then (response => response.json())
                .then ((response) => {
                    setStore({garages: response})
                    console.log(response)
                });
            },

			getMyGarage: () => {
				fetch(process.env.BACKEND_URL + `api/profile/garage`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.getItem("token")}`
				}
				})
				.then (response => response.json())
				.then ((response) => {
					setStore({garage: response})
					console.log(response)
				});
			},

			postGarage: async (name, mail, phone, cif, address, description, web, user_id, image_id) => {
				const token = localStorage.getItem("token");
			  
				try {
				  // Realiza una solicitud GET para obtener el taller del usuario
				//   const garageResponse = await fetch(process.env.BACKEND_URL + "api/profile/garage", {
				// 	method: "GET",
				// 	headers: {
				// 	  "Content-Type": "application/json",
				// 	  Authorization: `Bearer ${token}`
				// 	}
				//   });
				//   const garageData = await garageResponse.json();
				//   const myGarage = garageData.garage;
			  
				//   // Comprueba si ya existe un garaje con las mismas propiedades
				//   const isGarage = myGarage.some(garage => (
				// 	garage.name === name ||
				// 	garage.address === address||
				// 	garage.phone === phone
				//   ));
			  
				//   if (isGarage) {
				// 	console.log("El garaje ya existe.");
				// 	const navigate = useNavigate()
				// 	navigate("/create-garage")
				//   } else {
					const requestOptions = {
					  method: "POST",
					  headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					  },
					  body: JSON.stringify({
						name: name,
						mail: mail,
						phone: phone,
						cif: cif,
						address: address,
						description: description,
						web: web,
						user_id: user_id,
						image_id: image_id
					  })
					};
			  
					const response = await fetch(`${process.env.BACKEND_URL}api/create-garage`, requestOptions);
					if (response.ok) {
					  const data = await response.json();
					  console.log(data);
					  // Realiza las acciones necesarias después de un registro exitoso
					} else {
					  throw new Error("Error al registrar el garaje");
					}
				  
				} catch (error) {
				  console.error(error);
				  // Realiza las acciones necesarias en caso de error
				}
			  },
			  
			getProducts: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + `api/profile/onsale`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then (response => response.json())
				.then ((response) => {
					setStore({ products: response.data });
					console.log(response.data)
				})
			},

			getAllProducts: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + `api/products`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						
					}
				})
				.then (response => response.json())
				.then ((response) => {
					setStore({ products: response });
					console.log(response)
				})
			},

			getUsers: () => {
				fetch(process.env.BACKEND_URL + "api/users", {
				  method: "GET",
				  headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				  }
				})
				.then(response => response.json())
				.then(response => {
				  setStore({ users: response.data })
				  console.log(response)
				})
				.catch(error => {
				  console.error("Error:", error);
				});
			  },
			  
			getFavorites: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + `api/profile/favorites`, {
				  method: "GET",
				  headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				  }
				})
				  .then(response => response.json())
				  .then(response => {
					setStore({ products: response }); // Cambiar "favorites" por "products"
					console.log(response);
				  });
			},

			postFavorite: async (user_id, product_id) => {
				const token = localStorage.getItem("token");
				const store = getStore();
				
				// Comprobar si el producto ya está en los favoritos
				const isProductFavorited = store.favorites.some((favorite) => favorite.product_id === product_id);
			  
				if (isProductFavorited) {
				  console.log("El producto ya está guardado como favorito.");
				  return; // Salir de la función si el producto ya está en favoritos
				}
				
				try {
				  const requestOptions = {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					  Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ 
					  user_id: user_id,
					  product_id: product_id 
					}),
					};
			  
				  const response = await fetch(`${process.env.BACKEND_URL}api/profile/favorites`, requestOptions);
				  if (response.ok) {
					const data = await response.json();
					console.log(data);
					// Actualizar el store de favoritos si es necesario
					const updatedFavorites = [...store.favorites, data];
					setStore({ favorites: updatedFavorites });
				  } else {
					throw new Error('Error al añadir Favorito');
				  }
				} catch (error) {
				  console.error("Error:", error);
				}
			  },
			  
			putFavorite: (product_id) => {
				const token = localStorage.getItem("token");
				const requestOptions = {
				  method: "PUT",
				  headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				  }
				};
			  
				fetch(process.env.BACKEND_URL + `api/profile/favorites/${product_id}`, requestOptions)
				  .then(response => response.json())
				  .then(data => {
					const updatedFavorites = [...store.favorites, data]
					setStore({ favorites: updatedFavorites })
					console.log(data);
				  })
				  .catch(error => {
					console.error("Error:", error);
				  });
			},

			getReviews: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + `api/profile/reviews`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then (response => response.json())
				.then ((response) => {
					setStore({ reviews: response});
					console.log(response)
				})
			},

			getFilters: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + `api//search-by/<filter>`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						
					}
				})
				.then (response => response.json())
				.then ((response) => {
					setStore({ filters: response });
					console.log(response)
				})
			},
		}
	}
};

export default getState;


