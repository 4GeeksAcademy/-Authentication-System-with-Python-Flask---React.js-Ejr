import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import CoffeeLogo from "./CoffeeLogo";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { store, actions } = useContext(Context); // Accessing store and actions

  const handleLogOut = () => {
    actions.signOut(); // Call the signOut action from the store
    navigate('/'); // Optionally, navigate to the home page or login page after logging out
  };

  const isSpecialPage = location.pathname === "/signup" || location.pathname === "/";
  const shouldHideEmployeeIdButton = location.pathname === "/signup" || location.pathname === "/" || location.pathname === "/https://potential-eureka-wrrr7j5j557v3g5xv-3000.app.github.dev/";

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Sensation Light';
        src: url('/path-to-your-font/Sensation-Light.woff2') format('woff2'),
             url('/path-to-your-font/Sensation-Light.woff') format('woff');
        font-weight: light;
        font-style: light;
      }
    `;
    document.head.append(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <AppBar position="fixed" sx={{ top: 0, backgroundColor: '#2db734', zIndex: '9999', padding: '0 40px', width: 'calc(100% + 80px)', left: '-40px' }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <CoffeeLogo width="85px" height="85px" />
        </Link>
        <Typography 
          variant="h4"  // Make the text bigger
          component="div" 
          sx={{ 
            flexGrow: 1, 
            textAlign: 'center', 
            position: 'absolute', 
            left: '50%', 
            transform: 'translateX(-50%)',
            fontFamily: 'Sensation Light' 
          }}
        >
          CODEFUSION CAFE
        </Typography>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          {!shouldHideEmployeeIdButton && (
            <Link to="/transactions">
              <Button variant="contained" color="primary">
                {store.user.username ? `${store.user.username}` : 'EMPLOYEE ID'}
              </Button>
            </Link>
          )}
          {!isSpecialPage && <Button variant="contained" color="error" onClick={handleLogOut}>LOGOUT</Button>}
        </div>
      </Toolbar>
    </AppBar>
  );
};
