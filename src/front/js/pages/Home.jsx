import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Room } from '../component/Room.jsx';
import { SearchBar } from '../component/SearchBar.jsx';
import { Context } from "../store/appContext";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        actions.fetchRooms(); 
    }, []);

    const handleSearch = useCallback((searchTerm, roomType) => {
        const results = actions.searchRooms(searchTerm, roomType);
        setSearchResults(results);
    }, []);

    if (store.loadingRooms) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="home-header">
                <h1>Find your next pals to play</h1>
                <SearchBar onSearch={handleSearch} />
            </div>
            <div>
                {searchResults.length > 0 ? (
                    searchResults.map(room => (
                        <Room key={room.id} room={room} />
                    ))
                ) : (
                    <p>No rooms found</p>
                )}
            </div>
        </div>
    );
};
