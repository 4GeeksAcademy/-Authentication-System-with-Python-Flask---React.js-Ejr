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
			}]
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
			}
		}
	};
};

export default getState;
