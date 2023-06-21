import React from 'react';

const FindCanchaButton = () => {
    return (
        <button
            style={{
                backgroundImage: `url('https://www.enexclusiva.com/wp-content/uploads/2021/09/soccermedia-800x533.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                padding: '15px 25px',
                fontSize: '18px',
                textAlign: 'center',
                textDecoration: 'none',
                color: '#ffffff',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
            }}
        >
            Need a Cancha?
        </button>
    );
};

export default FindCanchaButton;