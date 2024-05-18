import Constants from "../app/constants.js"
import { storeDefaults } from "../app/defaults.js"

import Utils from "../app/utils.js"

const storeState = ({ getStore, getActions, setStore, mergeStore }) => {
	return {
		store: {
      readyState: {
        backend: false, frontend: false
      },
      userPrefs: storeDefaults.userPrefs,
      devPrefs: storeDefaults.devPrefs,
      board: storeDefaults.board,
      timestamp: 0,
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
        mergeStore({ readyState: { frontend: true }}) // mark frontend as ready
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

      // ------------------------------------------------------------ THIRD PARTY APIS

      getFontAwesomeIconList: async()=>{
				try{
          const res= await fetch('https://api.fontawesome.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `query { release(version: "6.5.2") { icons { id } } }`
              })
            })
          if(res.status==200){
            const 
              data= await res.json(),
              icons= data?.data?.release?.icons
            setStore({resources: { fa_icons: icons }})
            return icons != null
          }
        }
				catch(e){ console.log("Couldn't get FontAwesome icon list", e) }
				return false
      },

      // ------------------------------------------------------------ BACKEND

			// most actual webpages do have this, just a basic backend fetch to determine if backend server is up
			checkBackendHealth: async ()=>{
				try{
					const res = await fetch(process.env.BACKEND_URL + "/healthcheck", { method: "GET", cors: "no-cors" })
          mergeStore({ readyState: { backend: res.status===200 } })
          return true
				}
				catch(e){ console.log("BackEnd error:", e) }
        mergeStore({ readyState: { backend: false } })
				return false
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
        if(data && data.length==3){
          const newPrefs= {
            showState: data[0] != "0",
            panelPosition: parseInt(data[1]),
            devRender: data[2] != "0"
          }
          setStore({ devPrefs: newPrefs })
        }
      },

      saveDevPrefs:()=>{
        const prefs= getStore().devPrefs
        const data= [
          prefs.showState ? '1' : '0',
          prefs.panelPosition.toString(),
          prefs.devRender ? '1' : '0',
        ].join("")
        Utils.setCookie("devPrefs", data, [30,0,0], "/", Constants.COOKIE_SAMESITE_STRICT )
      },
		}
	}
}

export default storeState