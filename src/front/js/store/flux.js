const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			order: {
				total: null,
				items: []
			}
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			fetchCoffee: async () => {
				const response = await fetch(
				  `https://fake-coffee-api.vercel.app/api`
				)
				  .then((response) => {
					if (!response.ok) {
					  throw new Error("Network response was not okay");
					}
					return response.json();
				  })
				  .catch((err) => {
					console.error(err);
				  });
				  
				  const coffeePerCategory = response.reduce((acc, curr) => {
					if (!acc[curr.region]) {
					  acc[curr.region] = [];
					}
				  
					acc[curr.region] = [...acc[curr.region], curr];
					return acc;
				  }, {});
				  const actualStore = getStore();
				  setStore({...actualStore, ...coffeePerCategory});
			  },
		}
	};
};

export default getState;
