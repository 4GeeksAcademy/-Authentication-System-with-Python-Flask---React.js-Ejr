import CoffeeCard from "../component/coffeeCard.js";
import { Typography, IconButton, Button } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const AsiaPacific = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate(); // Use useNavigate to get the navigation function

  const handleClick = (name, price) => {
    actions.addCoffeeToOrder({ name, price });
  };

  const handleRemove = (name, price) => {
    actions.removeCoffeeFromOrder({ name, price });
  };

  const handleCheckout = () => {
    navigate('/payment'); // Navigate to the /payment page
  };

  const handleGoBack = () => {
    navigate('/regions'); // Navigate to the /regions page
  };

  return (
    <div style={{ display: "flex", paddingTop: '64px', paddingRight: '16px' }}>
      <div style={{ flex: 1, backgroundColor: "lightgray", padding: "20px", paddingRight: '16px', display: 'flex', flexDirection: 'column', paddingLeft: '16px', paddingTop: '50px', height: "100%" }}>
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
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}> {/* Changed to column layout */}
          <Button
            variant="contained"
            onClick={handleCheckout} // Updated onClick handler to handleCheckout
            style={{ backgroundColor: "#2DB734", color: "white", height: "50px" }}
          >
            Checkout {/* Changed button text to Checkout */}
          </Button>
        </div>
      </div>

      <div style={{ flex: 1, paddingLeft: '16px', paddingTop: '50px' }}>
        <Typography variant="h2">Coffee</Typography>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {store["Asia Pacific"] && store["Asia Pacific"].map((current) => (
            <div key={current.id} style={{ flex: "1 0 calc(50% - 16px)" }}>
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
