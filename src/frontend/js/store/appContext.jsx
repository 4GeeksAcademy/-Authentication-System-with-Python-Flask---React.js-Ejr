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

		React.useEffect(() => { state.actions.checkBackendHealth() }, [])

		return (
			<Context.Provider value={state}>
				<ReactComponent {...props} />
			</Context.Provider>
		)
	}
	return StoreWrapper
}

export default appContext
