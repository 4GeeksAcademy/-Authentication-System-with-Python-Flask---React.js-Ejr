import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Context } from "../store/appContext"; // Adjust the path to your flux file

function SignIn() {
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
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ top: 0, backgroundColor: '#2db734' }}>
        <Toolbar>
          {/* Centered Navbar */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            CODEFUSION CAFE
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs" sx={{ marginTop: '64px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mt: 1, textAlign: 'left' }}>
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
                <Link to="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
