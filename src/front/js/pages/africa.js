import CoffeeCard from "../component/coffeeCard.js";
import { Typography, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import DeleteIcon from '@mui/icons-material/Delete';

export const Africa = () => {
  const { store, actions } = useContext(Context);

  const handleClick = (name, price) => {
    actions.addCoffeeToOrder({ name, price });
  };

  const handleRemove = (name, price) => {
    actions.removeCoffeeFromOrder({ name, price });
  };

  return (
    <div style={{ display: "flex", paddingTop: '64px', paddingLeft: '16px', paddingRight: '16px' }}>
      <div style={{ flex: 1, paddingRight: '16px', display: 'flex', flexDirection: 'column', paddingLeft: '16px' }}>
        <Typography variant="h1">Orders:</Typography>
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
      </div>

      <div style={{ flex: 1, paddingLeft: '16px' }}>
        <Typography variant="h1">Coffee:</Typography>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {store.Africa && store.Africa.map((current) => (
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
