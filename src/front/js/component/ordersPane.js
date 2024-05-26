// src/components/OrdersPane.js
import React, { useContext } from 'react';
import { Typography, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const OrdersPane = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleRemove = (name, price) => {
    actions.removeCoffeeFromOrder({ name, price });
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <div style={{ flex: 1, backgroundColor: 'lightgray', padding: '20px', paddingRight: '16px', display: 'flex', flexDirection: 'column', paddingLeft: '16px', paddingTop: '50px', height: '100%' }}>
      <Typography variant="h2">Orders</Typography>
      <ul style={{ padding: 0, listStyle: 'none', flex: 1, marginTop: '16px' }}>
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
      <Typography variant="h3" style={{ marginTop: 'auto' }}>Total: ${store.order.total.toFixed(2)}</Typography>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Button
          variant="contained"
          onClick={handleCheckout}
          style={{ backgroundColor: '#2DB734', color: 'white', height: '50px' }}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default OrdersPane;
