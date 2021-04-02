const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			loginStatus: false,
			logedUser: {
				firstName: "",
				lastName: "",
				email: "",
				pass: "",
				birthDate: null
			},
			reserve: {
				servShirts: false,
				servBall: false,
				servReferee: false,
				hour: null
			},
			complex: {
				id: 0,
				firstHour: 8,
				lasthour: 11,
				unavailable: []
			},

			searchEng: {
				regions: [
					{
						name: "Arica y Parinacota",
						communes: ["Arica"],
						complex: []
					},
					{
						name: "Tarapacá",
						communes: ["Iquique"],
						complex: []
					},
					{
						name: "Antofagasta",
						communes: ["Antofagasta"],
						complex: []
					},
					{
						name: "Atacama",
						communes: ["Copiapó"],
						complex: []
					},
					{
						name: "Coquimbo",
						communes: ["La Serena"],
						complex: []
					},
					{
						name: "Valparaiso",
						communes: ["Valparaiso"],
						complex: []
					},
					{
						name: "Metropolitana",
						communes: ["Santiago", "Maipú"],
						complex: []
					},
					{
						name: "Libertador General Bernardo O'Higgins",
						communes: ["Rancagua"],
						complex: []
					},
					{
						name: "Maule",
						communes: ["Talca"],
						complex: []
					},
					{
						name: "Ñuble",
						communes: ["Chillán"],
						complex: []
					},
					{
						name: "Biobío",
						communes: ["Concepción"],
						complex: []
					},
					{
						name: "La Araucanía",
						communes: ["Temuco"],
						complex: []
					},
					{
						name: "Los Ríos",
						communes: ["Valdivia"],
						complex: []
					},
					{
						name: "Los Lagos",
						communes: ["Puerto Montt", "Castro"],
						complex: [
							{
								name: "Donde Manolo",
								id: "1"
							},
							{
								name: "Sport 7",
								id: "1"
							}
						]
					},
					{
						name: "Aysén del General Carlos Ibáñez del Campo",
						communes: ["Coyhaique"],
						complex: []
					},
					{
						name: "Magallanes y la Antártica Chilena",
						communes: ["Punta Arenas"],
						complex: []
					}
				]
			}
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
					.then(data => setStore({ message: data.message }));
				// .catch(error => console.log("Error loading message from backend", error));
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
			}
		}
	};
};

export default getState;
