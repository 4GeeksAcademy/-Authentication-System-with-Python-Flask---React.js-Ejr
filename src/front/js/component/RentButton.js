import React from 'react';

const RentButton = () => {
    return (
        <button
            style={{
                backgroundImage: `url('https://img.freepik.com/fotos-premium/baloncesto-cancha-calle-jugador-baloncesto-jugando-al-aire-libre-concepto-estilo-vida-deportivo_169160-989.jpg')`,
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
            Rent your Cancha
        </button>
    );
};

export default RentButton;