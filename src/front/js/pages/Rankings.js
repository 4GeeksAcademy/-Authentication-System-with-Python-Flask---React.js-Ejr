import React from "react";

const Rankings = () => {
    return (
        <div className="rankings-container">
            <div className="ranking">
                <h1>HIDERS</h1>
                <div className="table">
                    <div className="table-row header">
                        <div className="table-cell pos">POS</div>
                        <div className="table-cell name">NAME</div>
                        <div className="table-cell">SCORE</div>
                    </div>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className={`table-row ${getPositionClass(index + 1)}`}>
                            <div className="table-cell position">{index + 1}</div>
                            <div className={`table-cell name ${getPositionClass(index + 1)}`}>{`Hider ${index + 1}`}</div>
                            <div className={`table-cell score ${getPositionClass(index + 1)}`}>{index + 1}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="ranking">
                <h1>FINDERS</h1>
                <div className="table">
                    <div className="table-row header">
                        <div className="table-cell pos">POS</div>
                        <div className="table-cell name">NAME</div>
                        <div className="table-cell">SCORE</div>
                    </div>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className={`table-row ${getPositionClass(index + 1)}`}>
                            <div className="table-cell position">{index + 1}</div>
                            <div className={`table-cell name ${getPositionClass(index + 1)}`}>{`Finder ${index + 1}`}</div>
                            <div className={`table-cell score ${getPositionClass(index + 1)}`}>{index + 1}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const getPositionClass = (position) => {
    switch (position) {
        case 1: return 'first';
        case 2: return 'second';
        case 3: return 'third';
        default: return 'other';
    }
}

export default Rankings;
