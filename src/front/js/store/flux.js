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
			]
		},
		actions: {

			getProjects: () => {
				fetch("https://3001-xetnal-finalproject-rjwnejuo77t.ws-us45.gitpod.io/api/projects")
				  .then((response) => response.json())
				  .then((data) => {console.log(data); 
					setStore({ projects: data })
				})
			}, 

			// getProject: (id) => {
			// 	fetch("https://3001-xetnal-finalproject-v6ua4tu6zkd.ws-us45.gitpod.io/api/projects/"+id)
			// 	  .then((response) => response.json())
			// 	  .then((data) => {console.log(data); 
			// 		setStore({ projects: data })
			// 	});
			// }

			// Use getActions to call a function within a fuction
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },

			// getMessage: () => {
			// 	// fetching data from the backend
			// 	fetch(process.env.BACKEND_URL + "/api/hello")
			// 		.then(resp => resp.json())
			// 		.then(data => setStore({ message: data.message }))
			// 		.catch(error => console.log("Error loading message from backend", error));
			// },
			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// }



		}
	};
};

export default getState;
