// src/views/Africa.js
import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import CoffeeCard from '../component/coffeeCard';
import OrdersPane from '../component/ordersPane';

export const AsiaPacific = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleClick = (name, price) => {
    actions.addCoffeeToOrder({ name, price });
  };

  return (
    <div style={{ display: 'flex', paddingTop: '64px', paddingRight: '16px' }}>
      <OrdersPane />

      <div style={{ flex: 1, paddingLeft: '16px', paddingTop: '50px' }}>
        <Typography variant="h2">Coffee</Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {store['Asia Pacific'] && store['Asia Pacific'].map((current) => (
            <div key={current.id} style={{ flex: '1 0 calc(50% - 16px)' }}>
              <CoffeeCard
                name={current.name}
                price={current.price}
                handleClick={handleClick}
                image={current.image_url}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
