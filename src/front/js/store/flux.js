const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			jobOffers: [], 
			
		},
		actions: {
			loadJobOffers: async () => {
				// datos fake (Aqui llamadas api)
				const offers = [
					{
						id: 1,
						title: "Frontend Developer",
						company: "Tech Company S.L",
						location: "Remote",
						salary: "$40,000 - $60,000/year",
						description: "We are looking for a skilled Frontend Developer to..."
					},
					{
						id: 2,
						title: "Backend Developer",
						company: "Tech Company S.L",
						location: "On-site",
						salary: "$50,000 - $70,000/year",
						description: "We are looking for a skilled Backend Developer to..."
					},
					{
						id: 3,
						title: "Project Manager",
						company: "consulting Company S.L",
						location: "On-site",
						salary: "$90,000 - $100,000/year",
						description: "We are looking for a skilled Project Manager to..."
					},
					{
						id: 4,
						title: "UI/UX",
						company: "Design Company S.L",
						location: "On-site/remote",
						salary: "$40,000 - $60,000/year",
						description: "We are looking for a skilled Backend Developer to..."
					}
					
				];
				setStore({ jobOffers: offers });
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
		}
	};
};

export default getState;
