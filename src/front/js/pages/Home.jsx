import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Room } from '../component/Room.jsx';
import { SearchBar } from '../component/SearchBar.jsx';
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import '../../styles/RoomList.css'
import { IoIosAddCircleOutline } from "react-icons/io";

export const Home = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [searchResults, setSearchResults] = useState([]);
    const [showMyRooms, setShowMyRooms] = useState(false);
    const token = localStorage.getItem('jwt-token');
    const username = localStorage.getItem('username');

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
    const toggleRooms = (showMyRooms) => {
        setShowMyRooms(showMyRooms);
        if (showMyRooms) {
            const userRooms = store.rooms.filter(room => room.host_name === username);
            setSearchResults(userRooms);
        } else {
            setSearchResults(store.rooms);
        }
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
                        <div>
                            <button 
                                className={`toggle-button ${!showMyRooms ? 'active' : ''}`} 
                                onClick={() => toggleRooms(false)}>
                                All Rooms
                            </button>
                            <button 
                                className={`toggle-button ${showMyRooms ? 'active' : ''}`} 
                                onClick={() => toggleRooms(true)}>
                                My Rooms
                            </button>
                        </div>
                        <button onClick={handleCreateRoom} className="create-room-button"><IoIosAddCircleOutline /> Create new room</button>
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
