import React, { useState } from "react";
import { Link } from "react-router-dom";

const Rankings = () => {
    const [view, setView] = useState('Users');

    return (
        <div className="rankings-div">
            <div className="rankings-options pt-1">
                <button className="button-rankigns-options me-3" onClick={() => setView('Users')}>Users</button>
                <button className="button-rankigns-options" onClick={() => setView('Companies')}>Companies</button>
            </div>
            <div className="rankings-container">
                {view === 'Users' && (
                    <div className="ranking ranking-users">
                        {rankingTable('User')}
                    </div>
                )}

                {view === 'Companies' && (
                    <div className="ranking ranking-companies">
                        {rankingTable('Company')}
                    </div>
                )}
            </div>
            <div className="text-ranks-div pb-5"><p className="text-ranks">Click to see more about<Link to="/puntuacion" className="link-ranks">Status & Score</Link></p></div>
        </div>
    );
}

const rankingTable = (type) => (
    <div className="table">
        <div className="table-row header">
            <div className="table-cell pos ps-5">POS</div>
            <div className="table-cell name">NAME</div>
            <div className="table-cell">SCORE</div>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className={`table-row ${getPositionClass(index + 1)}`}>
                <div className="table-cell position ps-5">{index + 1}</div>
                <div className={`table-cell name ${getPositionClass(index + 1)}`}>{`${type} ${index + 1}`}</div>
                <div className={`table-cell score ${getPositionClass(index + 1)}`}>{index + 1}</div>
            </div>
        ))}
    </div>
);

const getPositionClass = (position) => {
    switch (position) {
        case 1: return 'first';
        case 2: return 'second';
        case 3: return 'third';
        default: return 'other';
    }
}

export default Rankings;
