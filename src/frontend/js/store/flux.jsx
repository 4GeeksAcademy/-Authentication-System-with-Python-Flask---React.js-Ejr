import Constants from "../app/constants.js"
import { storeDefaults } from "../app/defaults.js"

import Utils from "../app/utils.js"

const storeState = ({ getStore, getLanguage, getActions, setStore, mergeStore, setLanguage }) => {

	return {
		store: {
      // internal
      readyState: { backend: false, frontend: false, pointer: false, language: false },
      itemclasses: null,

      // user
      userPrefs: storeDefaults.userPrefs,

      // dev
      devPrefs: storeDefaults.devPrefs,
      fakeUser: null,
      
      // content
      board: storeDefaults.board,
      items: storeDefaults.items,

      // tracking
      timestamp: 0,
      dirty: 0
		},
    language: {
      get: (...path)=>{
        const pathname= _getLanguagePath(path)
        try {
          let cur_language= getLanguage()
          for(let p of pathname) {
            cur_language= cur_language[p]
            if(!cur_language) break
          }
          if(cur_language) return cur_language
        }
        catch(e){}
        return null
      }
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
        const cur_prefs= Utils.getCookie("userPrefs")
        if(cur_prefs && cur_prefs.length==2){
          const new_userPrefs= {
            darkMode: cur_prefs[0] != "0",
            language: parseInt(cur_prefs[1])?? 0
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

        const cur_userPrefs= getStore().userPrefs
        const data= [
          cur_userPrefs.darkMode ? '1' : '0',
          cur_userPrefs.language
        ].join("")

        Utils.setCookie("userPrefs", data, [30,0,0], "/", Constants.COOKIE_SAMESITE_STRICT )

        // TODO: binary save
      },

      loadLanguage: async (idx)=>{
        mergeStore({readyState: { language: false }})
				try{
          const 
            lang= Constants.LANGUAGE_FILES[idx],
            res= await fetch(`/assets/lang/${lang}.json`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' }
            })
          if(res.status!=200) throw(`server didn't responded ok for file: '${lang.toUpperCase()}'`)
          const 
            data= await res.json()
            if(!data) throw(`bad json file: '${lang.toUpperCase()}'`)
            setLanguage(data)
            mergeStore({readyState: { language: true }})
            return true
        }
				catch(e){ console.log("Couldn't load Language... fallback to EN-US", "Reason: " + e) }
				return false
      },

      // ------------------------------------------------------------ PAGE BEHAVIOUR

      setItemClasses: (classes)=> { setStore({ itemclasses: classes })},
      setPointerReady: (state)=> { mergeStore({ readyState: { pointer: state }})},

      setStoreDirty: (state)=> { setStore({ dirty: getStore().dirty | state })},
      unsetStoreDirty: (state)=> { setStore({ dirty: (getStore().dirty | state) ^ state })},

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

      loadBoard: async (bid, pid=-1)=>{
        console.log("loading board from backend yayyy")
      },

      // create a new item of given type on the board
      addItem: async (type, coords)=>{
        // backend -> POST create item and get resulting element
      },

      // create a new item of given type and append it to the item with given id
      addChildItem: async (id, type)=>{
        // backend -> POST create item and get resulting element
      },

			// most actual webpages do have this, just a basic backend fetch to determine if backend server is up
			checkBackendHealth: async ()=>{
				try{
					const res = await fetch("www" + process.env.BACKEND_URL + "/healthcheck", { method: "GET", cors: "no-cors" })
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
        const new_store={ 
          devPrefs: new_prefs,
          fakeUser: new_prefs.fakeAuth ? {
            username: "Paco Fiestas",
            email: "paquitosexy69@gmail.com",
            avatar: "https://api.dicebear.com/8.x/pixel-art/png?seed=paco"
          }: null}
        setStore(new_store)
        console.log(new_prefs.fakeAuth ? `Using fake user: ${new_store.fakeUser.username} (${new_store.fakeUser.email})` : "fake user removed")
      },

      loadDevPrefs:()=>{
        const cur_prefs= Utils.getCookie("devPrefs")
        console.log("devPrefs Cookie: ", cur_prefs)
        if(cur_prefs && cur_prefs.length==3){
          const new_devPrefs= {
            showState: cur_prefs[0] != "0",
            panelPosition: parseInt(cur_prefs[1]),
            devRender: cur_prefs[2] != "0"
          }
          setStore({ devPrefs: new_devPrefs })
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

  /** converts an object array into a 'obj1.obj2.obj3' formatted string, uses toString() in objs */
  function _getLanguagePath(path){
    const langpath= []
    for(let p of path) {
      if(typeof(p)==='string'){
        if(p.includes('.')) langpath.push(...p.split('.'))
        else langpath.push(p)
      }
      else langpath.push(p.toString())
    }
    return langpath
  }
}

export default storeState