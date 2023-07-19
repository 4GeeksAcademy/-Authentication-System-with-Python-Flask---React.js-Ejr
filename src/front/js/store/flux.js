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
				}
			],
			saved: [],
			cars: [],
			users: [],
			staticCars: [
				{ car_name: 'Car 1' },
				{ car_name: 'Car 2' },
				{ car_name: 'Car 3' },
			  ]
		},
		actions: {
			getAllUsers: () => {
				fetch('https://andresmedtr-supreme-space-fortnight-r9v57x44vx7cjw5-3001.preview.app.github.dev/api/users')
				.then((res) => res.json())
				.then((data) => {
					console.log(data)
					setStore({users: data})
				})

			},
			getAllCars: () => {
				fetch('https://andresmedtr-supreme-space-fortnight-r9v57x44vx7cjw5-3001.preview.app.github.dev/api/cars')
				.then((res) => res.json())
				.then((data) => {
					setStore({cars: data})
					console.log("These are stored cars in database:", data)
				})

			}		
		}
	};
};
export default getState;
