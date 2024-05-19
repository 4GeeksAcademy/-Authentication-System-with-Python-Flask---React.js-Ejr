import React, { useContext, useEffect } from 'react';
import { Room } from '../component/Room.jsx';
import { Context } from "../store/appContext";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchRooms(); // Llamar a la acción de carga de salas
    }, [actions]);

    if (store.loadingRooms) { // Usar el estado de carga del store
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="home-header">
                <h1>Find your next pals to play</h1>
                <input type="text" placeholder="Search.." />
            </div>
            <Room />
            <div>
                
            </div>
        </div>
    );
};
