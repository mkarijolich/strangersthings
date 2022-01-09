import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from "../api/index";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = (props) => {

  const {
    setUser
  } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failure, setFailure] = useState(false);
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const token = await login(username, password);

    if (!token) {
      setFailure(true);
      setOpen(true);
      return;
    }
    const user = {
      token: token,
      username: username
    }
    setUser(user)
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);

    setFailure(false);
    setOpen(true);
    navigate("/");
  }


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} >
                <TextField
                  name="username"
                  id="username"
                  value={username}
                  label="Username"
                  autoFocus
                  fullWidth
                  required
                  onChange={(e) => setUsername(e.currentTarget.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="password"
                  value={password}
                  label="Password"
                  fullWidth
                  required
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </Grid>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLoginSubmit}
              >
                Login
              </Button>
              <Grid container>
                <Grid item >
                  <Link href="./Register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Stack spacing={2} sx={{ width: '100%' }}>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          {failure ?
            <Alert onClose={handleClose} severity="error">This is an error message!</Alert>
            : <Alert severity="success">This is a success message!</Alert>}
        </Snackbar>
      </Stack>
    </ThemeProvider>
  )
}

export default Login;