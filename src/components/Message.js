import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { postMessage } from "../api/index"

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const theme = createTheme();

const Message = (props) => {

    const [messageTitle, setMessageTitle] = useState("");
    const [message, setMessage] = useState("")

    const {
        post
    } = props;

    const navigate = useNavigate();

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
                    <Typography component="h1" variant="h5">Send Message</Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="messageTitle"
                                    required
                                    fullWidth
                                    id="messageTitle"
                                    label="Title"
                                    autoFocus
                                    variant="standard"
                                    value={messageTitle}
                                    onChange={(e) => setMessageTitle(e.currentTarget.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="message"
                                    required
                                    fullWidth
                                    id="message"
                                    label="message"
                                    variant="standard"
                                    value={message}
                                    onChange={(e) => setMessage(e.currentTarget.value)}
                                />
                            </Grid>


                        </Grid>
                        <Button
                        sx ={{ ml:16, mt:2}}
                            variant="outlined"
                            onClick={(e) => {
                                e.preventDefault();
                                postMessage(message, post._id);
                                navigate('/posts')
                            }}
                        >Send</Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Message;