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

			// most actual webpages do have this, just a check to know if backend server is up
			checkBackendHealth: async () => {
				try{
					const res = (await fetch(process.env.BACKEND_URL + "/healthcheck"))
					setStore({ backend: res.status===200 })
					return res.text;
				}
				catch(e){ console.log("BackEnd error:", e) }
				return "ERROR"
			}
		}
	};
};

export default getState;
