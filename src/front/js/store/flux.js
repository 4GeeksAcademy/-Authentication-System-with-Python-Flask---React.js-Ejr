const getState = ({ getStore, getActions, setStore }) => {

	const localStorageOrder = JSON.parse(localStorage.getItem('order')) || {
        total: 0,
        items: []
    };

	return {
	  store: {
		order: localStorageOrder
	  },
	  actions: {
		// Use getActions to call a function within a function
		fetchCoffee: async () => {
		  const response = await fetch(`https://fake-coffee-api.vercel.app/api`)
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
		  setStore({ ...actualStore, ...coffeePerCategory });
		},
		addCoffeeToOrder: ({ name, price }) => {
			const store = getStore();
			const { order } = store;
			const updatedOrder = {
				...order,
				total: order.total + price,
				items: [...order.items, { name, price }]
			};
			setStore({ order: updatedOrder });
		
			// Update localStorage
			localStorage.setItem('order', JSON.stringify(updatedOrder));
		},
		removeCoffeeFromOrder: ({ name, price }) => {
			const store = getStore();
			const { order } = store;

			// Find the index of the coffee to remove
			const index = order.items.findIndex(item => item.name === name && item.price === price);

			if (index !== -1) {
				// Create a new array with the coffee removed
				const updatedItems = order.items.filter((item, i) => i !== index);

				// Update the order with the new items array
				const updatedOrder = {
					...order,
					total: order.total - price,
					items: updatedItems
				};

				// Update the store and localStorage
				setStore({ order: updatedOrder });
				localStorage.setItem('order', JSON.stringify(updatedOrder));
			}
		
		}
	  }
	};
  };
  
  export default getState;
  