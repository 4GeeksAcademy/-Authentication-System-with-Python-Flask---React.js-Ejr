import { Typography, IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import DeleteIcon from '@mui/icons-material/Delete';

export const OrderView = () => {
  const { store, actions } = useContext(Context);
  const [payment, setPayment] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const navigate = useNavigate(); // Use useNavigate to get the navigation function

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

  const handleCreditCardPayment = () => {
    // Add your credit card payment handling logic here
    setModalContent('Credit card payment processed.');
    setModalOpen(true);
    actions.subtractPaymentFromTotal(store.order.total);
    setPayment(0);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent('');
  };

  const handleGoBack = () => {
    navigate('/regions'); // Navigate to the /regions page
  };

  return (
    <div style={{ display: "flex", marginTop: "80px", padding: "20px" }}> {/* Added marginTop and padding */}
      <div style={{ flex: 1, backgroundColor: "lightgray", padding: "20px" }}>
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
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}> {/* Changed to column layout */}
          <Button
            variant="contained"
            onClick={handleGoBack}
            style={{ backgroundColor: "#2DB734", color: "white", height: "50px" }}
          >
            Go Back
          </Button>
        </div>
      </div>

      <div style={{ flex: 1, marginLeft: "20px", padding: "20px" }}>
        <Typography variant="h6">Payment</Typography> {/* Payment title */}
        <TextField
          label=""
          type="number"
          value={payment}
          onChange={(e) => setPayment(parseFloat(e.target.value))}
          fullWidth
          InputProps={{
            style: {
              border: "2px solid black",
              borderRadius: "4px",
            }
          }}
        />
        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
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
