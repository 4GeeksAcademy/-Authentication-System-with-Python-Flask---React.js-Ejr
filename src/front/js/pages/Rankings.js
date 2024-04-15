import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Rankings = () => {
    const [view, setView] = useState('Users');
    const [rankings, setRankings] = useState([]);

    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}/api/rankings/${view}`)
            .then(response => response.json())
            .then(data => setRankings(data))
            .catch(error => console.error('Error:', error));
    }, [view]);

    const getPositionClass = (position) => {
        switch (position) {
            case 1: return 'first';
            case 2: return 'second';
            case 3: return 'third';
            default: return 'other';
        }
    };

    return (
        <div className="rankings-div">
            <div className="rankings-options pt-1">
                <button className="button-rankigns-options me-3" onClick={() => setView('Users')}>Users</button>
                <button className="button-rankigns-options" onClick={() => setView('Companies')}>Companies</button>
            </div>
            <div className="rankings-container">
                <div className="ranking">
                    <div className="table">
                        <div className="table-row header">
                            <div className="table-cell pos ps-5">POS</div>
                            <div className="table-cell name">NAME</div>
                            <div className="table-cell">SCORE</div>
                        </div>
                        {rankings.map((user, index) => (
                            <div key={user.id} className={`table-row ${getPositionClass(index + 1)}`}>
                                <div className="table-cell position ps-5">{index + 1}</div>
                                <div className={`table-cell name ${getPositionClass(index + 1)}`}>{user.username}</div>
                                <div className={`table-cell score ${getPositionClass(index + 1)}`}>{user.points}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-ranks-div"><p className="text-ranks">Click to see more about<Link to="/status" className="link-ranks">Status & Score</Link></p></div>
        </div>
    );
}

export default Rankings;
