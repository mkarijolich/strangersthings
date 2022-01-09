import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewPost } from "../api/index"
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const theme = createTheme();

const CreatePost = () => {

    const [title, setTitle] = useState("");
    const [description, setDescrition] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [willDeliver, setWillDeliver] = useState(true);

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
                    <Typography component="h1" variant="h5">Create New Post</Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="title"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    autoFocus
                                    variant="standard"
                                    value={title}
                                    onChange={(e) => setTitle(e.currentTarget.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="description"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    variant="standard"
                                    value={description}
                                    onChange={(e) => setDescrition(e.currentTarget.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="price"
                                    required
                                    fullWidth
                                    id="price"
                                    label="Price"
                                    variant="standard"
                                    value={price}
                                    onChange={(e) => setPrice(e.currentTarget.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="location"
                                    id="location"
                                    label="Location"
                                    variant="standard"
                                    fullWidth
                                    value={location}
                                    onChange={(e) => setLocation(e.currentTarget.value)}
                                />
                            </Grid>
                            {/* <Grid item xs={12} sm={6}>
                            <TextField
                                name="willDeliver"
                                id="willDeliver"
                                label="WillDeliver"
                                variant="standard"
                                value={willDeliver}
                                onChange={(e) => setWillDeliver(e.currentTarget.value)}
                            />
                        </Grid> */}
                            <FormControlLabel sx={{ ml: 1 }}
                                control={
                                    <Checkbox color="primary"
                                        name="willDeliver"
                                        id="willDeliver"
                                        label="Will Deliver"
                                        variant="standard"
                                        value={willDeliver}
                                        onChange={(e) => {
                                            setWillDeliver(!willDeliver)
                                        }} />}
                                label="WillDeliver"
                            />

                        </Grid>
                        <Button
                            sx={{ mt: 2, ml: 16 }}
                            variant="outlined"
                            onClick={(e) => {
                                e.preventDefault()
                                createNewPost(title, description, price, location, willDeliver);
                                navigate('/posts')
                            }}
                        >Submit</Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>

    )
}

export default CreatePost;