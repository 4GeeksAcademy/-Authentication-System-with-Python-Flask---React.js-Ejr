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
			providers: null,
			category: null
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
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			loadProviders: () => {
				fetch("https://3001-plum-catshark-11aarra7.ws-us03.gitpod.io/api/provider")
					.then(response => response.json())
					.then(response => setStore({ providers: response }));
			},
			loadCategory: () => {
				fetch("https://3001-plum-catshark-11aarra7.ws-us03.gitpod.io/api/category")
					.then(response => response.json())
					.then(response => setStore({ category: response }));
			}
		}
	};
};

export default getState;
