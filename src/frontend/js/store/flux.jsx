const storeState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			backend_health: false,
		},
		actions: {

			// most actual webpages do have this, just a check to know if backend server is up
			checkBackendHealth: async () => {
				try{
					const res = (await fetch(process.env.BACKEND_URL + "/healthcheck"))
					setStore({ backend_health: res.status===200 })
					return res.text;
				}
				catch(e){ console.log("BackEnd error:", e) }
				return "ERROR"
			}
		}
	}
}

export default storeState;
