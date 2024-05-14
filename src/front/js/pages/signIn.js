import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar'; 
import MuiAlert from '@mui/material/Alert';
import Alert from '@mui/material/Alert';  
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function SignIn() {
  const [open, setOpen] = React.useState(false); // State to control Snackbar open/close
  const [showBasicCard, setShowBasicCard] = React.useState(false); // State to control Basic Card visibility

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const employeeId = data.get('employee-id');
    const password = data.get('password');
    console.log("Employee ID:", employeeId);
    console.log("Password:", password);

    // Check if the password is incorrect and show the Snackbar if it is
    if (password !== "correctPassword") { // Change "correctPassword" to the correct password
      setOpen(true);
    }
  };

  // Close Snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // Show Basic Card
  const handleForgotPasswordClick = () => {
    setShowBasicCard(true);
  };

  // Hide Basic Card
  const handleBasicCardClose = () => {
    setShowBasicCard(false);
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
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mt: 1, textAlign: 'left'}}>
            Sign in
          </Typography>
          <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
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
      {/*  incorrect password message */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{ backgroundColor: '#f00', opacity: 1 }}>
  <MuiAlert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
    Incorrect password. Please try again.
  </MuiAlert>
</Snackbar>
     {/* Basic Card */}
{showBasicCard && (
  <Card sx={{bgcolor: 'white', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', boxShadow: 'none', border: '1px solid #000' }}>
    
    <CardContent>
      <Typography variant="h5" component="div">
        Incorrect Password
      </Typography>
      <MuiAlert severity="error" >Please try again</MuiAlert>

      <Button onClick={handleBasicCardClose} variant="contained">
        Close
      </Button>
    </CardContent>
  </Card>
)}

    </ThemeProvider>
  );
}

export default SignIn;
