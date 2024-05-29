import React from "react"
import storeState from "./flux.jsx"

export const Context = React.createContext(null)

const appContext = ReactComponent => {
	const StoreWrapper = props => {
		const [state, setState] = React.useState(
			storeState({
				getStore: () => state.store,
				getLanguage: () => state.language,
				getActions: () => state.actions,
				setStore: new_store => _setstore(Object.assign(state.store, new_store)),
        mergeStore: (new_store, objectsOnly=true) => _setstore(_merge(state.store, new_store, objectsOnly)),
				setLanguage: new_language => _setlanguage(Object.assign(state.language, new_language)),
			})
		)

    function _setstore(new_store) {
      setState({
        store: new_store,
        language: { ...state.language },
        actions: { ...state.actions },
        millistamp: Date.now()
      })
    }

    function _setlanguage(new_language) {
      setState({
        store: { ...state.store },
        language: { ...new_language, get:state.language.get },
        actions: { ...state.actions },
        millistamp: Date.now()
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

		return (
			<Context.Provider value={state}>
        { state.store.readyState.frontend &&
				  <ReactComponent {...props} />
        }
			</Context.Provider>
		)
	}
	return StoreWrapper
}

export default appContext
