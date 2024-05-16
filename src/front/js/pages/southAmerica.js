import CoffeeCard from "../component/coffeeCard.js";
import { Typography, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import DeleteIcon from '@mui/icons-material/Delete';

export const SouthAmerica = () => {
  const { store, actions } = useContext(Context);

  const handleClick = (name, price) => {
    actions.addCoffeeToOrder({ name, price });
  };

  const handleRemove = (name, price) => {
    actions.removeCoffeeFromOrder({ name, price });
  };

  return (
    <div style={{ display: "flex", paddingTop:'64px' }}>
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

      <div style={{ flex: 1 }}>
        <Typography variant="h1">Coffee:</Typography>
        {store["South America"] && store["South America"].map((current) => (
          <CoffeeCard
            name={current.name}
            price={current.price}
            key={current.id}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};
