import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Room } from '../component/Room.jsx';
import { SearchBar } from '../component/SearchBar.jsx';
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [searchResults, setSearchResults] = useState([]);
    const token = localStorage.getItem('jwt-token');

    useEffect(() => {
        actions.fetchRooms();
    }, []);

    useEffect(() => {
        setSearchResults(store.rooms);
    }, [store.rooms]);

    const handleSearch = useCallback((searchTerm, mood) => {
        const results = actions.searchRooms(searchTerm, mood);
        setSearchResults(results);
    }, []);

    const handleCreateRoom = () => {
        navigate('/create-room');
    };

    if (store.loadingRooms) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            <div className="home-header">
                <h1>Find your next pals to play</h1>
                <SearchBar onSearch={handleSearch} />
                {token && (
                    <div className='d-flex justify-content-between align-items-center'>
                        <p className="align-self-center">All Rooms:</p>
                        <button onClick={handleCreateRoom} className="btn btn-primary mt-2">Create new room</button>
                    </div>
                )}
            </div>
            <div>
                {searchResults.length > 0 ? (
                    searchResults.map(room => (
                        <Room key={room.room_id} room={room} />
                    ))
                ) : (
                    <p>No rooms found</p>
                )}
            </div>
        </div>
    );
};
