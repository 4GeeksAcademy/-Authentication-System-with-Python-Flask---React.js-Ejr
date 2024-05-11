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
