const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: [],
			login: false,
			islogin: false,
			products: [],
			supermarket: [],
			cupons: [],
<<<<<<< HEAD
			favorites: [],
			token: sessionStorage.getItem("my_token") || ""
=======
			favorites: []
>>>>>>> d156b8add6cd0b86fc28ba2419d57529ffe053aa
		},
		actions: {
			// Use getActions to call a function within a fuction

			setLogin: loggin => {
				const store = getStore();
				setStore({ islogin: loggin });
			},

			loadProducts: async () => {
				const url = "https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/api/product";
				const response = await fetch(url);
				const data = await response.json();

				setStore({ products: data });
			},

			loadSupermarket: async () => {
				const url = "https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/api/market";
				const response = await fetch(url);
				const data = await response.json();
				setStore({ supermarket: data });
			},

			//Pendiente agregar la ruta
			loadCupons: async () => {
				const url = "https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/api/coupon";
				const response = await fetch(url);
				const data = await response.json();
				setStore({ cupons: data });
			},
			// Favorites
			loadFavorites: async () => {
				const url = "https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/api/cart";
				const response = await fetch(url);
				const data = await response.json();
				setStore({ favorites: data });
			}

			// AgregarFavoritos: favs => {
			//     setStore ({favoritos:getStore().favoritos.concat(favs)});
			// },

			// RemoverFavoritos: index => {
			//     const NuevoArrayFavoritos = getStore().favoritos.filter((item,index)=>{
			//         return index !== indice;
			//     });

			//     setStore({favorites:NuevoArrayFavoritos})
			//
			// }
		}
	};
};

export default getState;
