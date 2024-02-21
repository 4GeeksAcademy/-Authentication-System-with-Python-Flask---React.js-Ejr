const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			artPieces : [],
			artDepartments: [],
		},
		actions: {
		getObjects: () => {
			for (let i = 1; i < 25; i++){
				fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/"+i)
				.then(response => response.json())
				.then(data => {
					let store = getStore()
					if (data.objectName){
						store.artPieces.push(data)
						setStore(store)
					}
				})

			}
		},
		getDepartments: () => {
				fetch("https://collectionapi.metmuseum.org/public/collection/v1/departments")
				.then(response => response.json())
				.then(data => {
					let store = getStore()
						setStore({artDepartments: data.departments})
						console.log(store.artDepartments)
				})

			},
		// GET (by department) - > https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1 
		
		usersFavoritePage: async () => {
			const store = getStore()
			const response = await fetch(`${process.env.BACKEND_URL}/private`, {headers: {Authorization: store.token }})  
			if (!response.ok) {console.error("Failed to fetch user's information")}
		}
		}
	};
};

export default getState;
