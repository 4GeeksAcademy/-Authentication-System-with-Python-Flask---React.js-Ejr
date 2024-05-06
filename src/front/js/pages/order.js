
import React, { useState } from 'react';

const OrderList = () => {
  const [items, setItems] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);

  const fakeItems = [
    { name: 'Bubble Tea', price: 10 },
    { name: 'Iced Coffee', price: 15 },
    { name: 'Hot Chocolate', price: 15 },
    { name: 'English Tea', price: 15 },
    { name: 'Cappucino', price: 25 },
    { name: 'Espresso', price: 25 },
  ];

  const addItem = (itemName, itemPrice) => {
    const newItem = {
      name: itemName,
      price: parseFloat(itemPrice),
    };
    setItems([...items, newItem]);
  };

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <h2>Order</h2>
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {item.name} - ${item.price.toFixed(2)}
              {hoverIndex === index && (
                <span
                  style={{ marginLeft: '5px', cursor: 'pointer' }}
                  onClick={() => deleteItem(index)}
                >
                  (Remove)
                </span>
              )}
            </li>
          ))}
        </ul>
        <div>
          <strong>Total: ${totalPrice.toFixed(2)}</strong>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h2>Items</h2>
        <ul>
          {fakeItems.map((item, index) => (
            <li key={index} onClick={() => addItem(item.name, item.price)}>
              {item.name} - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderList;
