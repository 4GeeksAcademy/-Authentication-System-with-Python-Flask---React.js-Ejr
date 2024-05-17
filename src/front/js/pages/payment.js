import { Typography, IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import DeleteIcon from '@mui/icons-material/Delete';

export const OrderView = () => {
  const { store, actions } = useContext(Context);
  const [payment, setPayment] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleRemove = (name, price) => {
    actions.removeCoffeeFromOrder({ name, price });
  };

  const handleCashPayment = () => {
    if (payment < store.order.total) {
      const difference = (store.order.total - payment).toFixed(2);
      setModalContent(`Insufficient payment! You need $${difference} more.`);
      setModalOpen(true);

    } else {
      const change = (payment - store.order.total).toFixed(2);
      setModalContent(`Thank you for your payment! Your change is $${change}.`);
      setModalOpen(true);
      actions.subtractPaymentFromTotal(store.order.total);
      setPayment(0);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent('');
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Typography variant="h1">Orders:</Typography>
        <ul>
          {store.order.items.map((coffee, index) => (
            <li key={index}>
              {coffee.name} - ${coffee.price}
              <IconButton onClick={() => handleRemove(coffee.name, coffee.price)}>
                <DeleteIcon />
              </IconButton>
            </li>
          ))}
        </ul>
        <Typography variant="h3">Total: ${store.order.total.toFixed(2)}</Typography>
      </div>

      <div style={{ flex: 1, marginLeft: "20px" }}>
        <TextField
          label="Payment"
          type="number"
          value={payment}
          onChange={(e) => setPayment(parseFloat(e.target.value))}
        />
        <Button variant="contained" onClick={handleCashPayment}>Cash</Button>
      </div>

      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Payment Status</DialogTitle>
        <DialogContent>
          <Typography>{modalContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
