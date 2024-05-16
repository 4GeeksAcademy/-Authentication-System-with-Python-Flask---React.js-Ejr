import { Typography, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import RegionCard from "../component/RegionCard";
import DeleteIcon from '@mui/icons-material/Delete';

export const Regions = () => {
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
  {Object.keys(store)
    .filter((region) => region !== 'order' && region !== 'user')
    .map((region) => (
      <RegionCard image={getImageForRegion(region)} key={region}>
        <Link to={`/regions/${region.toLowerCase().replace(/\s+/g, '-')}`}>
          {region}
        </Link>
      </RegionCard>
    ))}
</div>


    </div>
  );
};

const getImageForRegion = (region) => {
  switch (region) {
    case 'Central America':
      return 'https://www.familysearch.org/en/wiki/img_auth.php/thumb/0/07/Central_America.png/900px-Central_America.png';
    case 'Africa':
      return 'https://www.nourhan.com/wp-content/uploads/2018/11/africa-map-with-capitals-large-political-map-of-africa-with-capitals-1999-africa-map-with-capitals-1.jpeg';
    // Add cases for other regions...
    case 'South America':
      return 'https://d1sz1zrtudycb.cloudfront.net/wp-content/uploads/2019/11/633986_south-america.jpg';
    case 'Asia Pacific':
      return 'https://www.english-blogs.com/wp-content/uploads/2014/05/Asia-Pacific.gif';
    case 'Middle East':
      return 'https://www.gifex.com/images/0X0/2009-11-17-11127/Middle-East-Political-Map.jpg';
    default:
      return ''; // Default empty image URL
  }
};
