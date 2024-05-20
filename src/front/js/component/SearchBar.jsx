import React, { useState, useEffect } from 'react';
import '../../styles/SearchBar.css';

export const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roomType, setRoomType] = useState('All');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectChange = (e) => {
        setRoomType(e.target.value);
    };

    
    useEffect(() => {
        if (onSearch) {
            onSearch(searchTerm, roomType);
        }
    }, [searchTerm, roomType, onSearch]);

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search rooms"
                value={searchTerm}
                onChange={handleInputChange}
                className="search-input"
            />
            <select value={roomType} onChange={handleSelectChange} className="room-type-select">
                <option value="All">All</option>
                <option value="Casual Rooms">Casual Rooms</option>
                <option value="Hardcore Rooms">Hardcore Rooms</option>
            </select>
        </div>
    );
};


