import React from 'react';

const OfferCard = ({ title, description, status }) => {
    return (
        <div className="card p-3 m-2" style={styles.card}>
            <h5>{title}</h5>
            <p>{description}</p>
            <button className="btn btn-primary">{status}</button>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: '#d0e1f2',
        borderRadius: '10px',
        minWidth: '250px',
    },
};

export default OfferCard;
