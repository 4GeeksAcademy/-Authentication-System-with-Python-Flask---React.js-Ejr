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
			appAuth: []
		},
		actions: {
			// get login/registration information

			responseGoogle: response => {
				return response;
			},

			responseFacebook: response => {
				return response;
			},

			manualRegistration: newuser => {
				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				let raw = JSON.stringify(newuser);

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				const apiEndPoint = "https://3001-chocolate-ox-jjqxr0q2.ws-us03.gitpod.io/api/register";

				fetch(apiEndPoint, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log("error", error));
			},

			//push login/registration information
			getUserIn: () => {
				//get the store
				const store = getStore();

				//push data to store
				store.appAuth.push(getActions().responseGoogle());
				store.appAuth.push(getActions().responseFacebook());
			}
		}
	};
};

export default getState;
