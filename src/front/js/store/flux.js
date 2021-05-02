const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			provincia: [
				{
					title: "Alajuela",
					background: "#3f3f3f",
					initial: "white"
				},
				{
					title: "San José",
					background: "#3f3f3f",
					initial: "white"
				},
				{
					title: "Cartago",
					background: "#3f3f3f",
					initial: "white"
				},
				{
					title: "Puntarenas",
					background: "#3f3f3f",
					initial: "white"
				},
				{
					title: "Limón",
					background: "#3f3f3f",
					initial: "white"
				},
				{
					title: "Guanacaste",
					background: "#3f3f3f",
					initial: "white"
				},
				{
					title: "Heredia",
					background: "#3f3f3f",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const home = store.home.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ home: home });
			}
		}
	};
};

export default getState;
