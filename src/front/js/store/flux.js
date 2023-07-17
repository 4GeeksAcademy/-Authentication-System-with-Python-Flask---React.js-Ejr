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

			
			users: [],

      token: localStorage.getItem("token") || "",
			products: [],
			favorites: [],
			reviews: []
		},

		actions: {
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
					const resp = await fetch(process.env.BACKEND_URL + "api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
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
				.then (response => response.json())
				.then ((response) => {
					setStore({ favorites: response});
					console.log(response.data)
				})
			},
			postFavorite: (product_id) => {
				const token = localStorage.getItem("token");
			  
				// Primero, realiza una solicitud GET para obtener la lista de productos favoritos del usuario
				fetch(process.env.BACKEND_URL + "api/profile/favorites", {
				  method: "GET",
				  headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				  }
				})
				.then(response => response.json())
				.then(data => {
				  const favorites = data.favorites;
				  const isProductFavorited = favorites.some(favorite => favorite.product_id === product_id);
			  
				  if (isProductFavorited) {
					console.log("El producto ya está guardado como favorito.");
				  } else {
					const requestOptions = {
					  method: "POST",
					  headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					  },
					  body: JSON.stringify({ product_id })
					};
			  
					fetch(process.env.BACKEND_URL + "api/profile/favorites", requestOptions)
					  .then(response => response.json())
					  .then(data => {
						console.log(data);
					  })
					  .catch(error => {
						console.error("Error:", error);
					  });
				  }
				})
				.catch(error => {
				  console.error("Error:", error);
				});
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
		}
	}
};

export default getState;


