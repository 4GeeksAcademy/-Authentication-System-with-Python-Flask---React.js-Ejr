const storeState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			backend_ready: false,
		},
		actions: {

			// most actual webpages do have this, just a check to know if backend server is up
			checkBackendHealth: async () => {
				console.log("hello world")
				try{

					const res = await fetch(process.env.BACKEND_URL + "/healthcheck", {
						method: "GET",
						cors: "no-cors"
					})

					setStore({ backend_ready: res.status===200 })
					console.log("hello world")
					return res.text;
				}
				catch(e){ console.log("BackEnd error:", e) }
				return "ERROR"
			}
		}
	}
}

export default storeState;
