import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Initializing our context, by default it's going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component.
// You can see the usage example in your layout component.
const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        // Initialize the state using the getState function
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) => {
                    // We use a functional update to correctly merge the new store updates
                    // with the current state to avoid closures on stale state.
                    setState((currentState) => ({
                        ...currentState,
                        store: {
                            ...currentState.store,
                            ...updatedStore
                        },
                    }));
                }
            })
        );

        useEffect(() => {
            // This function is the equivalent to "window.onLoad", it only runs once.
            // You should perform your API requests here.
            // IMPORTANT: Use actions from the state to manipulate the store, do not use setState directly.
            
            // Example:
            // state.actions.loadInitialData();

        }, []); // Note: empty dependency array means this effect runs once, similar to componentDidMount

        // Provide the state as the context value. This includes `store`, `actions`, and the `setStore` function.
        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };

    return StoreWrapper;
};

export default injectContext;
