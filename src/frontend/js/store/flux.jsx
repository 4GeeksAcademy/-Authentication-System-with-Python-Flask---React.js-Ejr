import Constants from "../app/constants.js"
import { storeDefaults } from "../app/defaults.js"

import Utils from "../app/utils.js"

const storeState = ({ getStore, getActions, setStore, mergeStore }) => {
	return {
		store: {
      readyState: {
        backend: false, frontend: false, pointer: false
      },
      fakeUser: null,
      userPrefs: storeDefaults.userPrefs,
      devPrefs: storeDefaults.devPrefs,
      timestamp: 0,
      
      // TEMP
      board: storeDefaults.board,
      items: storeDefaults.items,
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
        const new_userPrefs= structuredClone(getStore().userPrefs)
        new_userPrefs[pref]= value
        setStore({ userPrefs: new_userPrefs })
      },

      // decode and load the userPrefs from the cookie that contains it
      loadUserPrefs:()=>{
        const data= Utils.getCookie("userPrefs")
        if(data){
          const new_userPrefs= {
            darkMode: data[0] != "0"
          }
          setStore({ userPrefs: new_userPrefs })
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

      setPointerReady: (state)=> { mergeStore({ readyState: { pointer: state }})},

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
        const new_prefs= structuredClone(getStore().devPrefs)
        new_prefs[pref]= value
        setStore({ devPrefs: new_prefs })
        // instantly save dev prefs
        getActions().saveDevPrefs()
      },

      toggleDevAuth:()=>{
        const new_prefs= structuredClone(getStore().devPrefs)
        new_prefs.fakeAuth= !new_prefs.fakeAuth
        setStore({ 
          devPrefs: new_prefs,
          fakeUser: new_prefs.fakeAuth ? {
            username: "Paco Fiestas",
            email: "paquitosexy69@gmail.com",
            avatar: "https://api.dicebear.com/8.x/pixel-art/png?seed=paco"
          }: null}
        )
      },

      loadDevPrefs:()=>{
        const cur_prefs= Utils.getCookie("devPrefs")
        console.log("devPrefs Cookie: ", cur_prefs)
        if(cur_prefs && cur_prefs.length==3){
          const new_prefs= {
            showState: cur_prefs[0] != "0",
            panelPosition: parseInt(cur_prefs[1]),
            devRender: cur_prefs[2] != "0"
          }
          setStore({ devPrefs: new_prefs })
        }
      },

      saveDevPrefs:()=>{
        const cur_prefs= getStore().devPrefs
        const data= [
          cur_prefs.showState ? '1' : '0',
          cur_prefs.panelPosition.toString(),
          cur_prefs.devRender ? '1' : '0',
        ].join("")
        Utils.setCookie("devPrefs", data, [30,0,0], "/", Constants.COOKIE_SAMESITE_STRICT )
      },
		}
	}
}

export default storeState