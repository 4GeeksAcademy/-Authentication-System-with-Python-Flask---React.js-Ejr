const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			searchResults: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			searchBeers: async (query) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/search_beers?query=${encodeURIComponent(query)}`);
					console.log(response.status)
					if (response.status == 200) {
						const data = await response.json();
						setStore({ searchResults: data }); //Cambiar el store
					} else { 
						const data = await response.json();
						console.error(data.msg)
					}
				} catch (error) {
					console.log(error)
				}
			},
		}
	};
};

export default getState;
