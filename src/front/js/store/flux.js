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
						sector: "IT",
						tecnologies: "HTML, CSS, Javascript, Python",
						modality: "Remote",
						location: "Spain",
						salary: "$40,000 - $60,000/year",
						description: "Nuestra esencia nos ha llevado a la vanguardia de la tecnología, a romper paradigmas y a brindar las soluciones que realmente se corresponden a las necesidades de cada cliente. Nuestro talento nos ha hecho poder decir con orgullo que somos una de las 6 empresas TOP de tecnologías en el mundo. Buscamos a grandes profesionales que tengan experiencia en proyectos desarrollando con tecnologías Front End: React, Angular. Trabajaras siempre acompañado de un gran equipo y con metodologías ágiles como Scrum, usando herramientas como Jira y Confluence para estar unido a tu equipo y a los avances del proyecto"
					},
					{
						id: 2,
						title: "Backend Developer",
						company: "Tech Company S.L",
						sector: "IT",
						tecnologies: "HTML, CSS, Javascript, Python",
						modality: "On-site",
						location: "Spain",
						salary: "$50,000 - $70,000/year",
						description: "Nuestra esencia nos ha llevado a la vanguardia de la tecnología, a romper paradigmas y a brindar las soluciones que realmente se corresponden a las necesidades de cada cliente. Nuestro talento nos ha hecho poder decir con orgullo que somos una de las 6 empresas TOP de tecnologías en el mundo. Buscamos a grandes profesionales que tengan experiencia en proyectos desarrollando con tecnologías Front End: React, Angular. Trabajaras siempre acompañado de un gran equipo y con metodologías ágiles como Scrum, usando herramientas como Jira y Confluence para estar unido a tu equipo y a los avances del proyecto"
					},
					{
						id: 3,
						title: "Project Manager",
						company: "Consulting Company S.L",
						sector: "Administrative",
						tecnologies: "HTML, CSS, Javascript, Python",
						modality: "On-site",
						location: "Spain",
						salary: "$90,000 - $100,000/year",
						description: "Nuestra esencia nos ha llevado a la vanguardia de la tecnología, a romper paradigmas y a brindar las soluciones que realmente se corresponden a las necesidades de cada cliente. Nuestro talento nos ha hecho poder decir con orgullo que somos una de las 6 empresas TOP de tecnologías en el mundo. Buscamos a grandes profesionales que tengan experiencia en proyectos desarrollando con tecnologías Front End: React, Angular. Trabajaras siempre acompañado de un gran equipo y con metodologías ágiles como Scrum, usando herramientas como Jira y Confluence para estar unido a tu equipo y a los avances del proyecto"				},
					{
						id: 4,
						title: "UI/UX",
						company: "Design Company S.L",
						sector: "Real state",
						modality: "Hibryd",
						tecnologies: "HTML, CSS, Javascript, Python",
						location: "Spain",
						salary: "$40,000 - $60,000/year",
						description: "Nuestra esencia nos ha llevado a la vanguardia de la tecnología, a romper paradigmas y a brindar las soluciones que realmente se corresponden a las necesidades de cada cliente. Nuestro talento nos ha hecho poder decir con orgullo que somos una de las 6 empresas TOP de tecnologías en el mundo. Buscamos a grandes profesionales que tengan experiencia en proyectos desarrollando con tecnologías Front End: React, Angular. Trabajaras siempre acompañado de un gran equipo y con metodologías ágiles como Scrum, usando herramientas como Jira y Confluence para estar unido a tu equipo y a los avances del proyecto"
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
			register: async (formData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/register",{
						method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(formData),
					})
						const data = await resp.json()
						setStore(data)
						localStorage.setItem('token', data.token)
						return data
								
				} catch (error) {
					console.log('error:'+error)
				}
			},
			resetStore: ()=> {
				setStore({msg:"", success:""})
			}
			
		}
	};
};

export default getState;
