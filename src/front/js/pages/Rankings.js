import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Rankings = () => {
    const location = useLocation();
    const [view, setView] = useState(location.state?.view || 'Users');
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
                <button className="button-rankings-options me-3" onClick={() => setView('Users')}>Users</button>
                <button className="button-rankings-options" onClick={() => setView('Companies')}>Companies</button>
            </div>
            <div className="rankings-container">
                <div className="ranking">
                    <div className="table">
                        <div className="table-row header">
                            <div className="table-cell pos">POS</div>
                            <div className="table-cell name">NAME</div>
                            <div className="table-cell">SCORE</div>
                        </div>
                        {rankings.map((user, index) => (
                            <div key={user.id} className={`table-row ${getPositionClass(index + 1)}`}>
                                <div className="table-cell position ps-5">{index + 1}</div>
                                <div className={`table-cell name ${getPositionClass(index + 1)}`}>
                                    <img 
                                        src={user.photo || "https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg"} 
                                        alt="User photo" 
                                        className="rounded-circle user-photo-rankings" 
                                    />
                                    {user.username}
                                </div>
                                <div className={`table-cell score ${getPositionClass(index + 1)}`}>{user.points}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-ranks-div">
                <p className="text-ranks">Click to see more about<Link to="/status" className="link-ranks">Status & Score</Link></p>
            </div>
        </div>
    );    
}

export default Rankings;
