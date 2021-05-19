const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: sessionStorage.getItem("my_token") || "",
			login: false,
			products: [],
			supermarket: [],
			cupons: [],
			favorites: []
		},
		actions: {
			loadProducts: async () => {
				const url = process.env.BACKEND_URL + "/product";
				const response = await fetch(url);
				const data = await response.json();
				console.log("fluxprod", data);
				setStore({ products: data.Results });
			},

			loadSupermarket: async () => {
				const url = process.env.BACKEND_URL + "/market";
				const response = await fetch(url);
				const data = await response.json();
				setStore({ supermarket: data.Results });
			},

			//Pendiente agregar la ruta
			loadCupons: async () => {
				const url = process.env.BACKEND_URL + "/coupon";
				const response = await fetch(url);
				const data = await response.json();
				console.log("data", data);
				setStore({ coupons: data.Results });
			},
			// Favorites
			loadFavorites: async () => {
				var myHeaders = new Headers();
				myHeaders.append(
					"Authorization",
					"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyMTMwOTEwOCwianRpIjoiZjM1ZmE3OTItM2JhYS00Mzg5LTk1MTQtOGFkMGY4YTg5NzI0IiwibmJmIjoxNjIxMzA5MTA4LCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxMjMsImV4cCI6MTYyMTMxMDAwOH0.8DCZM72VIfAg1Chwz6ghco-WtD1RP3FlDLmYK-o4uXk"
				);
				const url = process.env.BACKEND_URL + "/cart";
				var requestOptions = {
					method: "GET",
					headers: myHeaders
				};
				const response = await fetch(url, requestOptions);
				if (response.status == 200) {
					const data = await response.json();
					setStore({ favorites: data.Results });
				} else {
					console.log("Usuario no logeado" + response.status);
				}
			},

			AgregarFavoritos: (id, product_name) => {
				setStore({ favorites: getStore().favorites.concat([id, product_name]) });
			},
			//Probar remover favoritos.
			RemoverFavoritos: index => {
				const NuevoArrayFavoritos = getStore().favorites.filter((item, index) => {
					return index !== indice;
				});

				setStore({ favorites: NuevoArrayFavoritos });
			}
		}
	};
};

export default getState;
