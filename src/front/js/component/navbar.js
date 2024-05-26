import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import CoffeeLogo from "./CoffeeLogo";
import { Context } from "../store/appContext";
import { ArrowBack } from '@mui/icons-material';
import SansationLightTTF from '../../font/Sansation-Light.ttf'; // Correct path

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { store, actions } = useContext(Context); // Accessing store and actions

  const handleLogOut = () => {
    actions.signOut(); // Call the signOut action from the store
    navigate('/'); // Optionally, navigate to the home page or login page after logging out
  };

  const isSpecialPage = location.pathname === "/signup" || location.pathname === "/";
  const shouldHideEmployeeIdButton = location.pathname === "/signup" || location.pathname === "/";

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Sansation Light';
        src: url(${SansationLightTTF}) format('truetype');
        font-weight: 300;
        font-style: normal;
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
      <Link to="/regions" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <CoffeeLogo width="85px" height="85px" />
        </Link>
        {!shouldHideEmployeeIdButton && (
            <Link to="/regions">
              <Button 
                variant="contained" 
                sx={{ backgroundColor: '#006400', color: 'white', marginRight: '10px', '&:hover': { backgroundColor: '#004d00' } }} // Dark green color
              >
                {<ArrowBack />}
              </Button>
            </Link>
          )}
          {!shouldHideEmployeeIdButton && (
            <Link to="/transactions">
              <Button 
                variant="contained" 
                sx={{ backgroundColor: '#006400', color: 'white', '&:hover': { backgroundColor: '#004d00' } }} // Dark green color
              >
                {store.user.username ? `${store.user.username}` : 'EMPLOYEE ID'}
              </Button>
            </Link>
          )}
        <Typography 
          variant="h4"  // Make the text bigger
          component="div" 
          sx={{ 
            flexGrow: 1, 
            textAlign: 'center', 
            position: 'absolute', 
            left: '50%', 
            transform: 'translateX(-50%)',
            fontFamily: 'Sansation Light' 
          }}
        >
          CODEFUSION CAFE
        </Typography>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          {!isSpecialPage && <Button variant="contained" color="error" onClick={handleLogOut}>LOGOUT</Button>}
        </div>
      </Toolbar>
    </AppBar>
  );
};
