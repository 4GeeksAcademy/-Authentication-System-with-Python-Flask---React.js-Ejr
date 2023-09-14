import showAlert from "../utilidades/alerts";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			signup: false,
			isloged: !!localStorage.getItem("jwt-token"),
			user_data: {
				name: null,
				last_name: null,
				email: null,
				password: null
			},
			login_user: {
				email: null,
				password: null
			},
			current_user: JSON.parse(localStorage.getItem("current_user")) || {},
			current_insti_user: JSON.parse(localStorage.getItem("current_insti_user")) || {},
			my_tracker: [],
			selectedScholarshipId: null,
			insSignup: false,
			insLoged: !!localStorage.getItem("jwt-token2"),
			institution_data: {
				institutional_name: null,
				email: null,
				password: null
			},
			institutionalLogin: {
				email: null,
				password: null
			},
			institutionName: null,
			scholarshipPost: {
				scholarship_name: null,
				institution: null,
				deadline: null,
				modality: null,
				coverage: null,
				professional_field: null,
				description: null,
				url_to: null
			},
			scholarshipPosted: false,
			hiddenMyProfile: true,
			hiddenMyInsProfile: true,
			hiddenLogin: false,
			hiddenLogout: true,
			hiddenSignup: false,

			allScholarships: [],


		},
		actions: {
			isPropertyEmpty: (obj) => {
				for (const key in obj) {
					if (obj[key] === "" || obj[key] == null || obj[key] === undefined) {
						return true;
					}
				}
				return false;
			},
			signUpUser: async () => {
				const store = getStore()
				const actions = getActions()
				try {

					if (actions.isPropertyEmpty(store.user_data)) {
						alert("Le falta llenar algunos datos");
						return;
					}

					const response = await fetch(process.env.BACKEND_URL + "/signup", {
						method: 'POST',
						body: JSON.stringify(store.user_data),
						headers: {
							'Content-Type': 'application/json'
						}
					})

					const result = await response.json()
					if (response.status == 400) {
						setStore({ signup: false })
					}


					if (response.ok) {
						setStore({ signup: true })
						showAlert("success", "Usuario registrado")
					}


				} catch (error) {
					console.error(error + " Error loading message from backend");
					setStore({ signup: false })
				}
			},
			logInUser: async () => {
				const store = getStore()
				const actions = getActions()
				try {
					if (actions.isPropertyEmpty(store.login_user)) {
						const customAlertElement = document.getElementById("customAlertLogIn"); {
							customAlertElement.innerHTML = '<div class="alert alert-danger d-flex justify-content-center" role="alert">Le falta llenar algunos datos </div>';
							return;
						};
					}

					const response = await fetch(process.env.BACKEND_URL + "/login", {
						method: 'POST',
						body: JSON.stringify(store.login_user),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const result = await response.json()
					console.log(result);

					if (response.ok) {
						localStorage.setItem("jwt-token", result.token);
						localStorage.setItem("current_user", JSON.stringify(result));
						setStore({ isloged: true });
						setStore({ insLoged : false })
						setStore({ current_user: result })

						alert("Login success");
						return true;

					} else {
						setStore({ isloged: false })
						setStore({ insLoged : false })
						alert(result.message)
					}

				} catch (error) {
					console.log(error + " Error loading message from backend")
					setStore({ isloged: false })
					setStore({ insLoged: false })

				}

			},


			handleChange: (e, type) => {
				const store = getStore()
				if (type == "login") {
					const newUserData = { ...store.login_user }
					newUserData[e.target.name] = e.target.value
					setStore({ login_user: newUserData })
				} else if (type == "signup") {
					const newUserData = { ...store.user_data }
					newUserData[e.target.name] = e.target.value
					setStore({ user_data: newUserData })
				} else if (type == "insSignup") {
					const newUserData = { ...store.institution_data }
					newUserData[e.target.name] = e.target.value
					setStore({ institution_data: newUserData })
				} else if (type == "insLogin") {
					const newUserData = { ...store.institutionalLogin }
					newUserData[e.target.name] = e.target.value
					setStore({ institutionalLogin: newUserData })
				} else if (type == "createScholarship") {
					const newUserData = { ...store.scholarshipPost }
					newUserData[e.target.name] = e.target.value
					setStore({ scholarshipPost: newUserData })
				}
			},

			signUpInstitution: async () => {
				const store = getStore()
				const actions = getActions()
				try {
					if (actions.isPropertyEmpty(store.institution_data)) {
						alert("Le falta llenar algunos datos");
						return;
					}
					const response = await fetch(process.env.BACKEND_URL + "/signup-ins", {
						method: 'POST',
						body: JSON.stringify(store.institution_data),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const result = await response.json()
					if (response.status == 400) {
						setStore({ insSignup: false })
						alert(result.message)
					}
					if (response.ok) {
						setStore({ insSignup: true })
						alert("Your account was created succesfully")
					}
				} catch (error) {
					console.error(error + " Error loading message from backend");
					setStore({ insSignup: false })
				}
			},
			logInInstitution: async () => {
				const store = getStore()
				const actions = getActions()
				try {
					if (actions.isPropertyEmpty(store.institutionalLogin)) {
						alert("Le falta llenar algunos datos :S");
						return;
					}
					const response = await fetch(process.env.BACKEND_URL + "/login-ins", {
						method: 'POST',
						body: JSON.stringify(store.institutionalLogin),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const result = await response.json()
					console.log(result);

					if (response.ok) {
						localStorage.setItem("jwt-token2", result.token);
						localStorage.setItem("current_insti_user", JSON.stringify(result));
						setStore({ insLoged: true });
						setStore({ isloged : false })
						setStore({ current_insti_user: result })
						alert("Welcome!");

						console.log("Nombre de la institución:", result.institution_name); // Agrega esta línea para depurar

						return true;
					} else {
						setStore({ insLoged: false })
						setStore({ isloged : false })

						alert(result.message)
					}
				} catch (error) {
					console.log(error + " Error loading message from backend")
					setStore({ insLoged: false })
					setStore({ isloged : false })

				}
			},


			postScholarship: async () => {
				const myToken = localStorage.getItem("jwt-token2");
				const store = getStore()
				const actions = getActions()
				setStore({ tokenUser: myToken })

				try {
					if (actions.isPropertyEmpty(store.scholarshipPost)) {
						alert("Le falta llenar algunos datos :S");
						return;
					}
					const response = await fetch(process.env.BACKEND_URL + "/create-scholarship", {
						method: 'POST',
						body: JSON.stringify(store.scholarshipPost),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + myToken
						}
					})
					const result = await response.json()
					console.log(result);
					if (response.ok) {
						localStorage.setItem("jwt-token2", result.token);
						alert("Scholarship added succesfully");
						setStore({ scholarshipPosted: true });
						return true;
					} else {
						setStore({ scholarshipPosted: false })
						alert(result.message)
					}
				} catch (error) {
					console.log(error + " Error loading message from backend")
					setStore({ scholarshipPosted: false })
				}
			},
			changeSignUpStatus: (value) => {
				setStore({ signup: value })
				setStore({ insSignup: value })

			},
			changeLogInStatus: () => {
				
				
				if (localStorage.getItem("jwt-token")) {
					setStore({ isloged: true });
					setStore({ insLoged: false });
					setStore({ hiddenLogout: false });
				  } else if (localStorage.getItem("jwt-token2")) {
					setStore({ isloged: false });
					setStore({ insLoged: true });
					setStore({ hiddenLogout: true });
				  }
				



			},
			changeMyProfileStatus: () => {
				if (localStorage.getItem("jwt-token")) {
				setStore({ isloged: true })
				setStore({ insLoged: false })
				}
			},

			changeMyInstitutionalProfileStatus: () => {
				if (localStorage.getItem("jwt-token2")) {
					setStore({ insLoged: true });
					setStore({ isloged: false });
				  } else {
					setStore({ insLoged: false });
					setStore({ isloged: false });
				  }

			},

			changeLogoutButton: (value) => {
				setStore({ hiddenLogout: value })
			},

			logout: () => {
				localStorage.clear();
				setStore({ isloged: false })
				setStore({ insLoged: false })
				setStore({ signup: false })
				setStore({ insSignup: false })
				setStore({ current_user: {} })
			},

			getAllScholarShips: async () => {
				const store = getStore()
				const actions = getActions()
				try {

					const response = await fetch(process.env.BACKEND_URL + "/scholarships", {
						method: 'GET'
					})
					const result = await response.json()
					console.log(result);
					setStore({ allScholarships: result.scholarships })

					if (response.status == 400) {
						alert(result.message)
						alert("NO ALL SCHOLARSHIPS")
						console.log(result)
					}

					if (response.ok) {
						alert("ALL SCHOLARSHIPS SUCCESS")
						console.log(result)
					} else {
						alert(result.message)
					}

				} catch (error) {
					console.log(error + " Error loading message from backend")
				}
			},
			getMyTracker: async () => {
				const myToken = localStorage.getItem("jwt-token");
				const store = getStore()
				const actions = getActions()
				try {

					const response = await fetch(process.env.BACKEND_URL + "/my_tracker", {
						method: 'GET',
						headers: {
							'Authorization': 'Bearer ' + myToken
						}
					})
					const result = await response.json()
					console.log(result);
					setStore({ my_tracker: result.becas_guardadas })

					if (response.status == 400) {
						alert(result.message)
						alert("No scholarships found")
						console.log(result)
					}
					if (response.ok) {
						console.log("Becas actualizadas")
					} else {
						alert(result.message)
					}
				} catch (error) {
					console.log(error + " Error loading message from backend")
				}
			},

			setSelectedScholarshipId: (scholarshipId) => {
				setStore({ selectedScholarshipId: scholarshipId });
			},

			addToMyTracker: async () => {
				const myToken = localStorage.getItem("jwt-token");
				const store = getStore();
				const actions = getActions();

				try {
					const response = await fetch(process.env.BACKEND_URL + "/add_to_tracker", {
						method: 'POST',
						headers: {
							'Authorization': 'Bearer ' + myToken,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ scholarship_id: store.selectedScholarshipId }), // Utiliza el ID almacenado en el estado
					});

					const result = await response.json();
					console.log(result);
					if (response.ok) {
						alert("Beca guardada exitosamente");
					} else {
						alert(result.error || result.message); // Muestra cualquier mensaje de error del servidor
					}
				}

				catch (error) {
					console.log(error + " Error loading message from backend");
				}
			}


		}
	}
};

export default getState;
