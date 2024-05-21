import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Container,
  CssBaseline,
  Snackbar,
  Alert as MuiAlert,
  Card,
  CardContent
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext";
import CoffeeImg from "../../img/coffeeLogo.png";

const CoffeeLogo = ({ width, height }) => {
    return <img src={CoffeeImg} alt="Coffee Logo" style={{ width, height }} />;
};

function SignIn() {
  const [open, setOpen] = useState(false); // State to control Snackbar open/close
  const [showBasicCard, setShowBasicCard] = useState(false); // State to control Basic Card visibility
  const [resetLinkSent, setResetLinkSent] = useState(false); // State to control Reset Link confirmation

  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const employeeId = data.get('employee-id');
    const password = data.get('password');
    try {
      await actions.login(employeeId, password);
      navigate('/regions');
    } catch (error) {
      console.error("Login failed:", error);
      setOpen(true);
    }
  };

  // Close Snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setResetLinkSent(false); // Close the reset link confirmation Snackbar
  };

  // Show Basic Card
  const handleForgotPasswordClick = () => {
    setShowBasicCard(true);
  };

  // Hide Basic Card
  const handleBasicCardClose = () => {
    setShowBasicCard(false);
  };

  // Handle Reset Link
  const handleSendResetLink = () => {
    setShowBasicCard(false);
    setResetLinkSent(true);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#2db734' }}> 
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            CODEFUSION CAFE
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
        <br></br>
        <br></br>

          <Typography component="h1" variant="h4" sx={{ mt: 1, textAlign: 'left' }}>
            Sign in
          </Typography>
          <Typography component="h1" variant="body1" sx={{ mt: 1 }}>
            New user? <Link to="/signup" variant="body2">Create an account</Link>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="employee-id"
              label="Employee ID"
              name="employee-id"
              autoComplete="employee-id"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#2db734' }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button onClick={handleForgotPasswordClick} variant="text" color="primary">
                  Forgot password?
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {/* Incorrect password message */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="error" sx={{ width: '100%', textAlign: 'center' }}>
          Incorrect password. Please try again.
        </MuiAlert>
      </Snackbar>
      {/* Password reset link confirmation */}
      <Snackbar open={resetLinkSent} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%', textAlign: 'center' }}>
          Password reset link sent. Please check your email.
        </MuiAlert>
      </Snackbar>
      {/* Basic Card */}
      {showBasicCard && (
        <Card sx={{ bgcolor: 'white', position: 'fixed', top: '50%', left: '70%', transform: 'translate(-50%, -50%)', boxShadow: 'none', border: '1px solid #000' }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              <span style={{ fontWeight: 'bold' }}>Forgot Password</span>
            </Typography>
            <Typography variant="body2" component="div">
              Please enter the email address used to SignUp. We will send a password reset.
            </Typography>
            <TextField id="outlined-basic" label="User Email" variant="outlined" sx={{ mt: 2, mb: 2 }} fullWidth />
            <Button onClick={handleSendResetLink} variant="contained" sx={{ mt: 2, bgcolor: '#2db734', width: '100%' }}>
              Send Reset Link
            </Button>
          </CardContent>
        </Card>
      )}
    </ThemeProvider>
  );
}

export default SignIn;
