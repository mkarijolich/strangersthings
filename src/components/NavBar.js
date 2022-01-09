import React, { Fragment } from 'react'
import { NavLink, useNavigate } from "react-router-dom";

import SearchBar from "../components/Search";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const theme = createTheme();

const NavBar = ({ user, handleLogout, posts, setFilteredPosts }) => {

    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            <Fragment>
                <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
                <CssBaseline />
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
                >
                    <Toolbar sx={{ flexWrap: 'wrap' }}>
                        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                            Stranger Things
                        </Typography>
                        <SearchBar posts={posts} setFilteredPosts={setFilteredPosts} />


                        {Object.keys(user).length > 0 ?
                            <nav>
                                <NavLink
                                    to="/"
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/posts"
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Posts
                                </NavLink>
                                <NavLink
                                    to="/createpost"
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Create Post
                                </NavLink>
                                <NavLink
                                    to="/profile"
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                ><AccountCircleIcon fontSize="large" sx={{ position: 'relative', top:10 }} />
                                </NavLink>
                                <Button
                                    variant="outlined"
                                    sx={{ my: 1, mx: 1.5 }}
                                    onClick={() => {
                                        handleLogout()
                                        navigate("/")
                                    }}>
                                    Logout
                                </Button>
                            </nav>

                            :
                            <nav>
                                <NavLink
                                    to="/"
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/posts"
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Posts
                                </NavLink>
                                <Button
                                    href="/login"
                                    variant="outlined"
                                    sx={{ my: 1, mx: 1.5 }}>
                                    Login
                                </Button>
                                <Button
                                    href="/register"
                                    variant="outlined"
                                    sx={{ my: 1, mx: 1.5 }}>
                                    Register
                                </Button>
                            </nav>
                        }
                    </Toolbar>
                </AppBar>
            </Fragment>
        </ThemeProvider>
    );

}

export default NavBar;