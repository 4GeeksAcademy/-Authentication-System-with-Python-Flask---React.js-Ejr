const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}],
			saved: [],
			cars: [],
			users: [],
			staticCars: [
				{ car_name: 'Car 1' },
				{ car_name: 'Car 2' },
				{ car_name: 'Car 3' },
				],
			token: null,
			filters: [{
				brand: "",
				car_name: "",
				car_type: "",
				engine: "",
				transmission: "",
				year: ""
			}],
			singleCar: [],
			errorMessage: null
		},
		actions: {
			getAllUsers: () => {
				fetch(`${process.env.BACKEND_URL}/users`)
				.then((res) => res.json())
				.then((data) => {
					setStore({users: data})
				})

			},
			getAllCars:  () => {
				 fetch(`${process.env.BACKEND_URL}/cars`)
				.then((res) => res.json())
				.then((data) => {
					setStore({cars: data})
					console.log("These are stored cars in database:", data)
				})
			},
			applyFilters: (filterArray) => {
				setStore({filters: filterArray})
				console.log("filters value:", filterArray)
			},
			singleCar: async (id) => {
				try {
				  const response = await fetch(`${process.env.BACKEND_URL}/cars/${id}`, {
					method: 'GET',
					redirect: 'follow'
				  });
				  if (!response.ok) {
					// Handle error if the response is not successful (optional)
					throw new Error('Network response was not ok');
				  }
				  const data = await response.json();
				  setStore({ singleCar: data });
				} catch (error) {
				  console.error('Error fetching singleCar data:', error);
				  // Handle any error or set error state if needed
				}
			  }
	}
}
}

export default getState;

	