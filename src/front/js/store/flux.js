import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentUser: null,
			auth: false,
			error: {},
			mercadoPago: {},
			products: [],
			product: {},
			favorites: [],
		},
		actions: {
			login: async (email, password) => {
				// hacer fetch que envie el email y password para poder loguearme
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"email": email,
							"password": password
						})
					})
					let data = await response.json()

					if (response.status === 200) {
						setStore({ currentUser: data.user })
						localStorage.setItem("token", data.access_token)
						return true
					}
					if (response.status === 404) {
						setStore({ error: data.msj })

						return false
					}


				} catch (error) {
					console.log(error);
					return false
				}
			},
			logout: () => {
				localStorage.removeItem("token");
				setStore({ auth: false })
				return true
			},
			validToken: async () => {
				let token = localStorage.getItem("token");
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/valid_token`, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`
						},
					})
					if (response.ok) {
						let data = await response.json()
						setStore({
							currentUser: data.user
						})
					}
				}
				catch (error) {
					console.log(error);
					return false
				}
			},
			register: async (name, email, password, address, phone) => {
				// hacer fetch que envie el email y password para poder loguearme
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"name": name,
							"email": email,
							"password": password,
							"address": address,
							"phone": phone,
							"is_active": true,
							"role_id": 1
						})
					})
					console.log(response)
					if (response.status === 201) {
						let data = await response.json()
						// localStorage.setItem("token", data.access_token)
						setStore({ auth: data.logged })
						return true
					}
					if (response.status === 404) {
						let data = await response.json()
						setStore({ error: data.msj })
						return false
					}
				} catch (error) {
					console.log(error);
					return false
				}
			},

			pagoMercadoPago: async (total) => {
				console.log(total)
				try {
					const response = await axios.post(`${process.env.BACKEND_URL}/api/preference`, {
						total: total,  //acá está de nuevo la variable  donde se guarda el total a pagar por el cliente 
					});
					console.log(response.data);
					setStore({ mercadoPago: response.data });  //guardamos  la info en el objeto que creamos en store 
				} catch (error) {
					console.log(error);
				}
			},

			// Obtener todos los productos
			getProducts: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/products`);
					const data = await response.json();
					setStore({ products: data.results })
					return true
				} catch (error) {
					return { success: false, error: error.message };
				}
			},
			// Obtener un producto específico
			getProduct: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/product/${id}`);
					if (response.ok) {
						const data = await response.json();
						setStore({ product: data });
						return { success: true, data };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msj };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},

			// Agregar un nuevo producto
			addProduct: async (product) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/product`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(product),
					});
					if (response.ok) {
						const data = await response.json();
						return { success: true, data };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msj };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},
			// Eliminar un producto
			deleteProduct: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/product/${id}`, { method: 'DELETE' });
					if (response.ok) {
						return { success: true };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msj };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},
			// Actualizar un producto
			updateProduct: async (id, updates) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/products/${id}`, {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(updates),
					});
					if (response.ok) {
						const data = await response.json();
						return { success: true, data };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msj };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},

			getFavoritesByUserId: async () => {
				let token = localStorage.getItem("token");
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/wishlist/users`, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`
						}
					});
					if (response.ok) {
						const data = await response.json();
						setStore({ favorites: data });
						return { success: true, data };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msj };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},

			addFavorite: async (productId) => {
				const store = getStore();
				const token = localStorage.getItem("token");
			
				const isFavorited = store.favorites.some(fav => fav.fav_product.id === productId);
			
				try {
					let response;
					if (isFavorited) {
						const favorite = store.favorites.find(fav => fav.fav_product.id === productId);
						response = await fetch(`${process.env.BACKEND_URL}/api/wishlist/${favorite.id}`, {
							method: 'DELETE',
							headers: {
								'Authorization': `Bearer ${token}`
							}
						});
					} else {
						response = await fetch(`${process.env.BACKEND_URL}/api/wishlist/user`, {
							method: 'POST',
							headers: {
								'Authorization': `Bearer ${token}`,
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({ fav_product: productId })
						});
					}
			
					if (response.ok) {
						actions.getFavoritesByUserId();
						return { success: true };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msg };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},			
			
			deleteFavorite: async (favoriteId) => {
				let token = localStorage.getItem("token");
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/wishlist/${favoriteId}`, {
						method: 'DELETE',
						headers: {
							'Authorization': `Bearer ${token}`
						}
					});
			
					if (response.ok) {
						const data = await response.json();
						await getActions().getFavoritesByUserId();
						return { success: true, data };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msg };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},

			uploadImage: async (data) => {
				console.log(data)
				const response = await fetch(`${process.env.BACKEND_URL}/api/upload`, {
					method: 'POST',
					body: data,
					headers: {
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					}
				})
				const data_result = await response.json()
				if(response.ok){
					return data_result
				}
				console.log(data_result)
			},

			scrollToTop: () => {
				window.scrollTo({
					top: 0,
					behavior: "smooth"
				});
			}

		}
	}
};


export default getState;