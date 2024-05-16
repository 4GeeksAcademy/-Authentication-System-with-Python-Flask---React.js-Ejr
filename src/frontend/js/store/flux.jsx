import Utils from "../app/utils.js"

export const Constants= Object.freeze({

  COOKIE_SAMESITE_NONE: "None",
  COOKIE_SAMESITE_NONE_SECURE: "None; Secure",
  COOKIE_SAMESITE_LAX: "Lax",
  COOKIE_SAMESITE_STRICT: "Strict",

  SESSION_MODE_SIGNUP: 0,
  SESSION_MODE_LOGIN: 1,
  SESSION_MODE_LOGOUT: 2,
  SESSION_MODE_RECOVER: 3,
  SESSION_MODE_DELETED: 4,

  USERPREFS_DARKMODE: "darkMode",

  DEVPREFS_SHOWSTATE: "showState",
  DEVPREFS_PANELPOSITION: "panelPosition",
})

const storeState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
      // DEFAULT user settings, save them on cookies?
      userPrefs: {
        darkMode: false
      },
      // DEFAULT dev settings, for us, remove on production
      devPrefs: {
        showState: true,
        panelPosition: 1
      },
      readyState: {
        backend: false,
        frontend: false
      },
      timestamp: 0
		},
		actions: {

      // ------------------------------------------------------------ DATA MANAGEMENT

      // initialization tasks, on page loading or refreshing (f5)
      initialize: async ()=>{

        const _actions= getActions()

        _actions.loadUserPrefs()
        _actions.loadDevPrefs()

        // do initialization tasks
				
        // keep this following lines at the end of the function
        setStore({ readyState: { frontend: true }} ) // mark frontend as ready
        await getActions().checkBackendHealth() // check if backend is ready, and set it accordly
        if(!getStore().readyState.backend) console.log("Couldn't connect to backend, page will render in offline mode")
      },

      getUserPref:(pref)=>{ return getStore().userPrefs[pref]?? null },
      
      toggleUserPref:(pref)=>{
        getActions().setUserPref(pref, !getStore().userPrefs[pref])
      },
      
      setUserPref:(pref, value)=>{
        const newPrefs= structuredClone(getStore().userPrefs)
        newPrefs[pref]= value
        setStore({ userPrefs: newPrefs })
      },

      // decode and load the userPrefs from the cookie that contains it
      loadUserPrefs:()=>{
        const data= Utils.getCookie("userPrefs")
        if(data){
          const newUserPrefs= {
            darkMode: data[0] != "0"
          }
          setStore({ userPrefs: newUserPrefs })
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

        Utils.setCookie("userPrefs", data, [30,0,0], "/", Constants.COOKIE_SAMESITE_STRICT )

        // TODO: binary save
      },

      // ------------------------------------------------------------ PAGE BEHAVIOUR

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
      
      getDevPref:(pref)=>{ return getStore().devPrefs[pref]?? null },
      
      toggleDevPref:(pref)=>{
        getActions().setDevPref(pref, !getStore().devPrefs[pref])
      },
      
      setDevPref:(pref, value)=>{
        const newPrefs= structuredClone(getStore().devPrefs)
        newPrefs[pref]= value
        setStore({ devPrefs: newPrefs })
        // instantly save dev prefs
        getActions().saveDevPrefs()
      },

      loadDevPrefs:()=>{
        const data= Utils.getCookie("devPrefs")
        console.log("devPrefs Cookie: ", data)
        if(data){
          const newPrefs= {
            showState: data[0] != "0",
            panelPosition: parseInt(data[1])
          }
          setStore({ devPrefs: newPrefs })
        }
      },

      saveDevPrefs:()=>{
        const prefs= getStore().devPrefs
        const data= [
          prefs.showState ? '1' : '0',
          prefs.panelPosition.toString()
        ].join("")
        Utils.setCookie("devPrefs", data, [30,0,0], "/", Constants.COOKIE_SAMESITE_STRICT )
      },
		}
	}
}

export default storeState
