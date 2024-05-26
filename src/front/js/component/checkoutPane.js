// src/components/OrdersPane.js
import React, { useContext } from 'react';
import { Typography, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPane = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleRemove = (name, price) => {
    actions.removeCoffeeFromOrder({ name, price });
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <div style={{ flex: 1, backgroundColor: 'lightgray', padding: '20px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', boxSizing: 'border-box', paddingTop: '50px' }}>
      <Typography variant="h2">Orders</Typography>
      <div style={{ flex: 1, overflowY: 'auto', marginTop: '16px' }}>
        <ul style={{ padding: 0, listStyle: 'none', margin: 0 }}>
          {store.order.items.map((coffee, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <IconButton onClick={() => handleRemove(coffee.name, coffee.price)} style={{ marginRight: '16px' }}>
                <DeleteIcon />
              </IconButton>
              <Typography variant="h6" component="span">
                {coffee.name} - ${coffee.price}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ paddingTop: '16px', backgroundColor: 'lightgray' }}>
        <Typography variant="h3">Total: ${store.order.total.toFixed(2)}</Typography>
      </div>
    </div>
  );
};

export default CheckoutPane;
