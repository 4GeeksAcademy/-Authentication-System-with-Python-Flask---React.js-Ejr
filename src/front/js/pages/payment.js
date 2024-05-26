import { Typography, IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import CheckoutPane from "../component/checkoutPane.js";

export const OrderView = () => {
  const { store, actions } = useContext(Context);
  const [payment, setPayment] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const navigate = useNavigate();

  const handleRemove = (name, price) => {
    actions.removeCoffeeFromOrder({ name, price });
  };

  const handleCashPayment = async () => {
    if (store.order.items.length === 0) {
      setModalContent('Transaction declined! Your order is empty.');
      setModalOpen(true);
      return;
    }

    const paymentAmount = parseFloat(payment.replace('$', '')) || 0;
    if (paymentAmount < store.order.total) {
      const difference = (store.order.total - paymentAmount).toFixed(2);
      setModalContent(`Insufficient payment! You need $${difference} more.`);
      setModalOpen(true);
    } else {
      const change = (paymentAmount - store.order.total).toFixed(2);
      setModalContent(`Thank you for your payment! Your change is $${change}.`);
      setModalOpen(true);

      setPayment('');
      try {
        // Ensure products are stringified
        await actions.createTransaction(store.order.total, store.order.items, true); // Cash payment
        actions.clearOrder();
      } catch (error) {
        console.error("Error creating cash transaction:", error);
        // Handle error (e.g., display error message)
      }
    }
  };

  const handleCreditCardPayment = async () => {
    if (store.order.items.length === 0) {
      setModalContent('Transaction declined! Your order is empty.');
      setModalOpen(true);
      return;
    }

    setModalContent('Credit card payment processed.');
    setModalOpen(true);
    setPayment('');
    try {
      // Ensure products are stringified
      await actions.createTransaction(store.order.total, store.order.items, false); // Credit card payment
      actions.clearOrder();
    } catch (error) {
      console.error("Error creating credit card transaction:", error);
      // Handle error (e.g., display error message)
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent('');
  };

  const handleGoBack = () => {
    navigate('/regions');
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    if (!payment) {
      setIsInputFocused(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.replace('$', '');
    if (!isNaN(value) || value === '') {
      setPayment(value === '' ? '' : `$${value}`);
    }
  };

  return (
    <div style={{ display: "flex", paddingTop: '64px', paddingRight: '16px' }}>
      <CheckoutPane />

      <div style={{ flex: 1, paddingLeft: '16px', paddingTop: '50px' }}>
        <Typography variant="h2">Payment</Typography>
        <TextField
          label=""
          type="text"
          value={isInputFocused ? payment : payment || '$0.00'}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          fullWidth
          InputProps={{
            style: {
              border: "2px solid black",
              borderRadius: "4px",
            }
          }}
          style={{ marginTop: '20px' }}
        />
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            onClick={handleCashPayment}
            style={{ backgroundColor: "#2DB734", color: "white", flex: 1, height: "50px" }}
          >
            Cash
          </Button>
          <Button
            variant="contained"
            onClick={handleCreditCardPayment}
            style={{ backgroundColor: "#2DB734", color: "white", flex: 1, height: "50px" }}
          >
            Credit Card
          </Button>
        </div>
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
