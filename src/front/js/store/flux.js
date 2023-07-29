const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favorites:[],
			destination:[]

		},
		actions: {
			// Use getActions to call a function within a fuction
			addFav: (newFav) => {
				let newFavorites = getStore().favorites;
				newFavorites.push(newFav);
				setStore({ favorites: newFavorites });
			  },
			  destination: async () =>{
				try{
				const response = await fetch("https://bobo305-verbose-pancake-7v7wxqvx677hr5v4-3001.preview.app.github.dev/api/destination")
				const data = await response.json();
				// setToken(data.token)
				setStore({destinations: data});
				return data;
			
				}catch(error){console.log ("error:", error)}
			
			}
		}
	};
};

export default getState;
