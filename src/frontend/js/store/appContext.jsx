import React from "react"
import storeState from "./flux.jsx"

export const Context = React.createContext(null)

const appContext = ReactComponent => {
	const StoreWrapper = props => {
		const [state, setState] = React.useState(
			storeState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore => _set(Object.assign(state.store, updatedStore)),
        mergeStore: (updatedStore, objectsOnly=true) => _set(_merge(state.store, updatedStore, objectsOnly))
			})
		)

    function _set(new_store) {
      setState({
        store: new_store,
        actions: { ...state.actions },
        timestamp: Date.now()
      })
    }

    function _merge(a, b, objectsOnly) {
      return Object.entries(b).reduce((o, [k, v]) => {
          o[k] = v && typeof v === 'object' ? _merge(o[k] = o[k] || (!objectsOnly && (Array.isArray(v) ? [] : {})), v, objectsOnly) : v
          return o
      }, a)
    }

    // call initialize on startup
		React.useEffect(() => { state.actions.initialize() }, [])

    // applies darkMode changes to actual page
    React.useEffect(()=>{
      if(state.store.userPrefs.darkMode) {
        document.body.setAttribute("data-darkmode","holaquetalmedastutelefono?nov?ayapuesnadacomaseustedunano")
      }
      else document.body.removeAttribute("data-darkmode")
    },[state.store.userPrefs.darkMode])

		return (
			<Context.Provider value={state}>
				<ReactComponent {...props} />
			</Context.Provider>
		)
	}
	return StoreWrapper
}

export default appContext
