import React from "react";
import { NavDropdown } from "react-bootstrap";

const CartDropdown = ({ cartItems, clearCart }) => {
  console.log("cartitems:" + cartItems);
  return (
    <NavDropdown title={`Cart (${cartItems.length})`} id="basic-nav-dropdown">
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <NavDropdown.Item key={index}>{item.title}</NavDropdown.Item>
        ))
      ) : (
        <NavDropdown.Item>No items in cart</NavDropdown.Item>
      )}

      {cartItems.length > 0 && <NavDropdown.Divider />}
      {cartItems.length > 0 && (
        <NavDropdown.Item onClick={clearCart}>Clear Cart</NavDropdown.Item>
      )}
      <NavDropdown.Item>Checkout</NavDropdown.Item>
    </NavDropdown>
  );
};

export default CartDropdown;
