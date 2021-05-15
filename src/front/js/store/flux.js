const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			product: [],
			supermarket: [],
			cupons: [],
			// favorites: []
		},
		actions: {
			// Use getActions to call a function within a fuction

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
				const url = "https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/api/";
				const response = await fetch(url);
				const data = await response.json();
				setStore({ cupons: data });
			},

			
		}
	};
};

export default getState;