const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: [],
			login: false,
			islogin: false,
			products: [],
			supermarket: [],
			cupons: [],
			favorites: []
		},
		actions: {
			// Use getActions to call a function within a fuction

			setLogin: login => {
				const store = getStore();
				setStore({ islogin: login });
			},

			loadProducts: async () => {
				const url = "https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/api/product";
				const response = await fetch(url);
				const data = await response.json();
				console.log("fluxprod", data);
				setStore({ products: data.Results });
			},

			loadSupermarket: async () => {
				const url = "https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/api/market";
				const response = await fetch(url);
				const data = await response.json();
				setStore({ supermarket: data.Results });
			},

			//Pendiente agregar la ruta
			loadCupons: async () => {
				const url = "https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/api/coupon";
				const response = await fetch(url);
				const data = await response.json();
				console.log("data", data);
				setStore({ coupons: data.Results });
			}
			// Favorites

			// addFavorites: favs => {
			//     setStore ({favorites:getStore().favorites.concat(favs)});
			// },

			// removeFavorites: index => {
			//     const NewArrayFavs = getStore().favorites.filter((item,index)=>{
			//         return index !== indice;
			//     });

			//     setStore({favorites:NewArrayFavs})
			// }
		}
	};
};

export default getState;
