import Constants from "../app/constants.js"
import { storeDefaults } from "../app/defaults.js"

import Utils from "../app/utils.js"

const storeState = ({ getStore, getLanguage, getActions, setStore, mergeStore, setLanguage }) => {

	return {
		store: {
      // internal
      readyState: { backend: false, frontend: false, pointer: false, language: false },
      activePage: null,

      // user
      userPrefs: storeDefaults.userPrefs,
      userData: null,

      // dev
      devPrefs: storeDefaults.devPrefs,
      
      // content
      board: null,
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

      // #region ----------------------------------------------------------------------------------------- DATA MANAGEMENT

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
      //#endregion

      // #region ----------------------------------------------------------------------------------------- PAGE BEHAVIOUR

      setActivePage: (idx)=> setStore({ activePage: idx }),

      setPointerReady: (state)=> { mergeStore({ readyState: { pointer: state }})},

      getStoreDirty: (state)=> { return getStore().dirty & state },
      setStoreDirty: (state)=> { setStore({ dirty: getStore().dirty | state })},
      unsetStoreDirty: (state)=> { setStore({ dirty: (getStore().dirty | state) ^ state })},

      getTimestamp: async(subdomain, id)=>{
				try{
          const res= await fetch(Utils.getBackendUrl("workspaces", "/timestamp?id=" + id), { method: "GET", cors: "no-cors" })
          if(res.status==200){
            const data= await res.text()
            console.log("got timestamp:", data)
            return data
          }
        }
				catch(e){ console.log(`Unable to get timestamp for: ${subdomain}-${id}`, e) }
				return false
      },
      //#endregion

      // #region ----------------------------------------------------------------------------------------- THIRD PARTY APIS

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
      //#endregion

      // #region ----------------------------------------------------------------------------------------- ACCOUNTS

      /** registers a new account */
      accounts_signup: async (username, displayname, email, password, remember)=>{
        const res= await getActions().simpleBackendRequest({
          endpoint:"POST|accounts:/signup",
          body: {
            username: username,
            displayname: displayname?? username,
            email: email,
            password: password,
            login: 0,
            loginafter: loginafter,
            remember: remember ? 1 : 0
          }
        })
        if((200,201).includes(res.status) && loginafter){
          const data= await res.json()
          setStore({userData: data.res})
        }
        return {status: res.status, msg: res.msg}
      },

      /** login into the account with given credentials */
      accounts_login: async (account, password, remember)=>{
        const res= await getActions().simpleBackendRequest({
          endpoint:"POST|accounts:/login",
          body: {
            account: account,
            password: password,
            remember: remember ? 1 : 0
          }
        })
        if(res.status==200) {
          const data= res.json()
          if(data.res) setStore({userData: res})
        }
        return {status: res.status, msg: res.msg}
      },

      /** logs out of current session */
      accounts_logout: async ()=>{
        const res= await getActions().simpleBackendRequest({
          endpoint:"GET|accounts:/logout"
        })
        return {status: res.status, msg: res.msg}
      },

      /** rotates the tokens (refresh) -- this makes up to 4 retries */ 
      accounts_tokenRotate: async ()=>{
        let res;
        for(let i=4; i> 0; i--){
          res= await getActions().simpleBackendRequest({
            endpoint:"GET|accounts:/rotate_4da6b724968255957637bec4"
          })
          if(res.status===119) continue;
          if((419,200,-1).includes(res.status) || i<=0) break;
        }
        return {status: res.status, msg: res.msg}
      },

      /** get current user from backend */
      accounts_currentUser: async ()=>{
        const res= await getActions().simpleBackendRequest({
          endpoint:"GET|accounts:/user"
        })
        return {status: res.status, msg: res.msg}
      },

      /** get if username is registered */
      accounts_usernameRegistered: async (name)=>{
        const res= await getActions().simpleBackendRequest({
          endpoint:`GET|accounts:/username/${name}`
        })
        return res.status===200
      },

      /** deletes an account forever // requires credentials token + manually entered credentials data */
      accounts_delete: async (email, password)=>{
        const res= await getActions().simpleBackendRequest({
          endpoint:"POST|accounts:/delete",
          body:{
            email: email,
            password: password
          }
        })
        if(res.status==200) setStore({userData: null})
        return {status: res.status, msg: res.msg}
      },

      /** gets permission // easy bypass-able -- dont use for sensitive content */
      accounts_auth: async (level)=>{
        const res= await getActions().simpleBackendRequest({
          endpoint:"GET|accounts:/auth",
          body: {level:level}
        })
				if(res.status===200) setStore({ userAuthLevel: res.status===200 })
        return {status: res.status, msg: res.msg}
      },

      /** request verification email */
      accounts_verify_request: async ()=>{
        const res= await getActions().simpleBackendRequest({
          endpoint:"GET|accounts:/verify"
        })
        return {status: res.status, msg: res.msg}
      },

      /** submit verification email code */
      accounts_verify_submit: async (vericode)=>{
        const res= await getActions().simpleBackendRequest({
          endpoint:"POST|accounts:/verify",
          body: {
            vericode: vericode
          }
        })
        return {status: res.status, msg: res.msg}
      },

      /** request recovery email */
      accounts_recover_request: async (email)=>{
        const res= await getActions().simpleBackendRequest({
          endpoint:"GET|accounts:/recover",
          body: {
            email: email
          }
        })
        return {status: res.status, msg: res.msg}
      },

      /** submit recovery email code */
      accounts_recover_submit: async (email, passcode, newPassword)=>{
        const res= await getActions().simpleBackendRequest({
          endpoint:"POST|accounts:/recover",
          body: {
            email: email,
            passcode: passcode,
            password: newPassword
          }
        })
        return {status: res.status, msg: res.msg}
      },

      /** modify account data */
      accounts_modify: async (new_userData, password)=>{
        const res= await getActions().simpleBackendRequest({
          endpoint:"PATCH|accounts:/user",
          body: {
            current_password: password,
            ...new_userData
          },
          mimetype:'multipart/form-data'
        })
        if(res.status===200){
          const data= await res.json()
          setStore({userData: data.res})
        }
        return {status: res.status, msg: res.msg}
      },
      //#endregion

      simpleBackendRequest: async ({endpoint, body=null, credentials=true, mimetype=null})=>{
        let res= null
        try{
          const
            endpointData= /(?:^([A-z]+)\||^)(?:([^:]+):|)(.*)/.exec(endpoint)
            location= Utils.getBackendUrl(...([endpointData[2]??"", endpointData[3]]))
          
				  res= await fetch(Utils.getBackendUrl(location), {
            method: endpointData[0],
            ...(credentials? {credentials: include} : {}), // <---- this must be only sent in our backend fetch calls, nowhere else
            ...(body? {
              headers: { 'Content-Type': mimetype?? 'application/json' },
              body: JSON.stringify(body)
            } : {})
          })
        }
				catch(e){ console.log(`Error fetching ${endpoint.replace(":","-->")}`, e) }
        return res? {status: res.status, msg: res.msg} : {status: -1, msg: "internal error"}
      },

      // #region ----------------------------------------------------------------------------------------- BOARDS

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
					const res = await fetch(Utils.getBackendUrl("", "/healthcheck"), { method: "GET", cors: "no-cors" })
          mergeStore({ readyState: { backend: res.status===200 } })
          return true
				}
				catch(e){ console.log("BackEnd error:", e) }
        mergeStore({ readyState: { backend: false } })
				return false
			},
      //#endregion

      // #region ----------------------------------------------------------------------------------------- DEVELOPER ONLY
      
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

        const cur_user= getStore().userData

        if(!cur_user || cur_user.fake){
          const new_prefs= structuredClone(getStore().devPrefs)
          new_prefs.fakeAuth= !new_prefs.fakeAuth
          const new_store={ 
            devPrefs: new_prefs,
            userData: new_prefs.fakeAuth ? {
              id: 0,
              username: "paco69",
              displayname: "Paco Fiestas",
              email: "paquitosexy69@gmail.com",
              last_visits: [0, 0],
              avatar: "https://api.dicebear.com/8.x/pixel-art/png?seed=paco",
              fake: true
            }: null}
          setStore(new_store)
          console.log(new_prefs.fakeAuth ? `Using fake user: ${new_store.userData.username} (${new_store.userData.email})` : "fake user removed")
        }
        else console.log("current user is not fake, i'm out of this shit not gonna do anything...")
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

      //#endregion
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