import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import CoffeeLogo from "./CoffeeLogo";

export const Navbar = () => {
  const location = useLocation();

  // Check if the current route is the sign-up page or the specified link
  const isSpecialPage = location.pathname === "/signup" || location.pathname === "/"; // Adjust the path for the specified link as necessary

  return (
    <AppBar position="fixed" sx={{ top: 0, backgroundColor: '#2db734', zIndex: '9999' }}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          {/* Logo on the far left */}
          <CoffeeLogo width="50px" height="50px" />
        </Link>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          CODEFUSION CAFE {/* Centered text */}
        </Typography>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/transactions">
            <Button variant="contained" color="primary">EMPLOYEE ID</Button>
          </Link>
          {/* Render the logout button only if not on the sign-up page or the specified link */}
          {!isSpecialPage && <Button variant="contained" color="error">LOGOUT</Button>}
        </div>
      </Toolbar>
    </AppBar>
  );
};
