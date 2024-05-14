import React from "react"
import storeState from "./flux.jsx"

export const Context = React.createContext(null)

const appContext = ReactComponent => {
	const StoreWrapper = props => {
		const [state, setState] = React.useState(
			storeState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		)

    // call initialize on startup
		React.useEffect(() => { state.actions.initialize() }, [])

    // applies darkMode changes to actual page
    React.useEffect(()=>{
      if(state.store.userPrefs.darkMode) {
        document.body.setAttribute("data-darkmode","1")
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
