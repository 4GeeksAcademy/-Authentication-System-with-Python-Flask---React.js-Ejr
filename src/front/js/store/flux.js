const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
						store.artDepartments.push(data)
						setStore(store)
				})

			}
		// GET (by department) - > https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1 
			
		}
	};
};

export default getState;
