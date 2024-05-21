import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import CoffeeLogo from "./CoffeeLogo";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { actions } = useContext(Context);

  const handleLogOut = () => {
    actions.signOut(); // Call the signOut action from the store
    navigate('/'); // Optionally, navigate to the home page or login page after logging out
  };

  // Check if the current route is the sign-up page or the specified link
  const isSpecialPage = location.pathname === "/signup" || location.pathname === "/";

  // Check if the current route is the sign-up page or the specified link where the EMPLOYEE ID button should be hidden
  const shouldHideEmployeeIdButton = location.pathname === "/signup" || location.pathname === "/" || location.pathname === "/https://potential-eureka-wrrr7j5j557v3g5xv-3000.app.github.dev/";

  return (
    <AppBar position="fixed" sx={{ top: 0, backgroundColor: '#2db734', zIndex: '9999', padding: '0 40px', width: 'calc(100% + 80px)', left: '-40px' }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <CoffeeLogo width="70px" height="70px" />
        </Link>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            textAlign: 'center', 
            position: 'absolute', 
            left: '50%', 
            transform: 'translateX(-50%)',
            fontFamily: 'Sensation Light' // Apply the custom font
          }}
        >
          CODEFUSION CAFE
        </Typography>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          {!shouldHideEmployeeIdButton && (
            <Link to="/transactions">
              <Button variant="contained" color="primary">EMPLOYEE ID</Button>
            </Link>
          )}
          {!isSpecialPage && <Button variant="contained" color="error" onClick={handleLogOut}>LOGOUT</Button>}
        </div>
      </Toolbar>
    </AppBar>
  );
};
