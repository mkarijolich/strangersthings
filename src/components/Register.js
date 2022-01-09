import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { register } from "../api/index";

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

const theme = createTheme();

const Register = (props) => {

    const {
        setUser
    } = props;

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const token = await register(username, password);

        if (!token) {
            return;
        }

        const user = {
            token: token,
            username: username
        }

        setUser(user)
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);

        navigate("/");
    }

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
                        Create New Account
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleRegisterSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                    value={username}
                                    onChange={(e) => setUsername(e.currentTarget.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="password"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.currentTarget.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="password2"
                                    required
                                    fullWidth
                                    id="password2"
                                    label="Confirm Password"
                                    value={password2}
                                    onChange={(e) => setPassword2(e.currentTarget.value)}
                                />
                            </Grid>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleRegisterSubmit}
                            >
                                Register
                            </Button>
                            
                            <Grid item xs>
                                <Link href="./login" variant="body2">
                                    {"Already have an account?"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>

    )
}

export default Register;