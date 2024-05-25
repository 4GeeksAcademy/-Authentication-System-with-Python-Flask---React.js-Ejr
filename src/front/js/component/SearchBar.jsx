import React, { useState, useEffect } from 'react';
import '../../styles/SearchBar.css';

export const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [mood, setMood] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleMoodChange = (e) => {
        setMood(e.target.value);
    };

    useEffect(() => {
        if (onSearch) {
            onSearch(searchTerm, mood);
        }
    }, [searchTerm, mood, onSearch]);

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search rooms or games"
                value={searchTerm}
                onChange={handleInputChange}
                className="search-input"
            />
            <select value={mood} onChange={handleMoodChange} className="mood-select">
                <option value="">All Moods</option>
                <option value="casual">Casual</option>
                <option value="hardcore">Hardcore</option>
            </select>
        </div>
    );
};
