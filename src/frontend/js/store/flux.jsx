import Utils from "../app/utils.js"

const storeState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
      // DEFAULT user settings, save them on cookies?
      userPrefs: {
        darkMode: false,
      },
      // DEFAULT dev settings, for us, remove on production
      devPrefs: {
        showTools: true,
      },
      readyState: {
        backend: false,
        frontend: false
      }
		},
		actions: {

      // ------------------------------------------------------------ DATA MANAGEMENT

      // initialization tasks, on page loading or refreshing (f5)
      initialize: async ()=>{

        const _actions= getActions()
        _actions.loadUserPrefs()

        // do initialization tasks
				
        // keep this following lines at the end of the function
        
        setStore({ readyState: { frontend: true }} ) // mark frontend as ready, 
        await getActions().checkBackendHealth() // check if backend is ready, and set it accordly
        if(!getStore().readyState.backend) console.log("Couldn't connect to backend, page will render in offline mode")
      },

      // decode and load the userPrefs from the cookie that contains it
      loadUserPrefs:()=>{
        const data= Utils.getCookie("userPrefs")
        if(data){
          const newUserPrefs= {
            darkMode: data[0] != "0"
          }
          setStore({ userPrefs: newUserPrefs} )
        }

        // TODO: binary load
        //const data= Utils.base64str2bytes(Utils.getCookie("userPrefs"))
        //if(data){
        //  newUserPrefs= {
        //    darkMode: data[0] & 0b1
        //  }
        //}
      },

      // decode and load the userPrefs from the cookie that contains it
      saveUserPrefs:()=>{

        const _userPrefs= getStore().userPrefs
        const data= [
          _userPrefs.darkMode ? '1' : '0'
        ].join("")

        Utils.setCookie("userPrefs", data, [30,0,0], "/", Utils.constants.COOKIE_SAMESITE_STRICT )

        // TODO: binary save
      },

      // ------------------------------------------------------------ PAGE BEHAVIOUR

      // toggles dark mode on/off
      toggleDarkMode:()=>{ 
        setStore({ userPrefs: { darkMode: !getStore().userPrefs.darkMode }} )
        // dont save during development
        // getActions().saveUserPrefs()
      },

      // ------------------------------------------------------------ BACKEND

			// most actual webpages do have this, just a basic backend fetch to determine if backend server is up
			checkBackendHealth: async ()=>{
				try{
					const res = await fetch(process.env.BACKEND_URL + "/healthcheck", { method: "GET", cors: "no-cors" })
					setStore({ readyState: { backend: res.status===200 }} )
					return res.text;
				}
				catch(e){ console.log("BackEnd error:", e) }
				return "ERROR"
			},

      // ------------------------------------------------------------ DEVELOPER ONLY
      
      loadDevPrefs:()=>{
        const data= Utils.getCookie("devPrefs")
        if(data){
          const newDevPrefs= {
            showTools: data[0] != "0"
          }
          setStore({ devPrefs: newDevPrefs} )
        }
      },

      saveDevPrefs:()=>{
        const _devPrefs= getStore().devPrefs
        const data= [
          _devPrefs.showTools ? '1' : '0'
        ].join("")
        Utils.setCookie("devPrefs", data, [30,0,0], "/", Utils.constants.COOKIE_SAMESITE_STRICT )
      },
		}
	}
}

export default storeState;
