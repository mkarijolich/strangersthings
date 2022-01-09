import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePost } from "../api/index";
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

const Edit = (props) => {

    const {
        currentPostInput
    } = props;

    const [editTitle, setEditTitle] = useState(currentPostInput.title); //saved data in post page as default
    const [editDescription, setEditDescription] = useState(currentPostInput.description);
    const [editPrice, setEditPrice] = useState(currentPostInput.price);
    const [editLocation, setEditLocation] = useState(currentPostInput.location);
    const [editWillDeliver, setEditWillDeliver] = useState(currentPostInput.willdeliver);

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
                    <Typography component="h1" variant="h5">Edit Post</Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="editTitle"
                                    required
                                    fullWidth
                                    id="editTitle"
                                    label="Title"
                                    autoFocus
                                    variant="standard"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.currentTarget.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="editDescription"
                                    required
                                    fullWidth
                                    id="editDescription"
                                    label="Description"
                                    variant="standard"
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.currentTarget.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="editPrice"
                                    required
                                    fullWidth
                                    id="editPrice"
                                    label="Price"
                                    variant="standard"
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(e.currentTarget.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="editLocation"
                                    id="editLocation"
                                    label="Location"
                                    variant="standard"
                                    fullWidth
                                    value={editLocation}
                                    onChange={(e) => setEditLocation(e.currentTarget.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary"
                                            name="editWillDeliver"
                                            id="editWillDeliver"
                                            variant="standard"
                                            value={editWillDeliver}
                                            onChange={(e) => setEditWillDeliver(!editWillDeliver)} />}
                                    label="Will Deliver"
                                />

                            </Grid>

                        </Grid>
                        <Button
                            sx={{ mt: 2, ml: 18 }}
                            variant="outlined"
                            onClick={(e) => {
                                e.preventDefault()
                                updatePost(editTitle, editDescription, editPrice, editLocation, editWillDeliver, currentPostInput._id);
                                navigate('/posts')
                            }}
                        >Submit</Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>


    )
}

export default Edit;