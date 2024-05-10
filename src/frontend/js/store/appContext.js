import React from "react"
import getState from "./flux.js"

export const Context = React.createContext(null)

const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		const [state, setState] = React.useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		)

		useEffect(() => { state.actions.getBackendHealth() }, [])

		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		)
	}
	return StoreWrapper
}

export default injectContext
