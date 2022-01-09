import React from 'react';
import { deletePost } from "../api/index";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const theme = createTheme();

const Delete = (props) => {

    const {
        post
    } = props;


    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        deletePost(post._id);
        navigate('/posts')
    }

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
                    <Typography component="h1" variant="h5">Delete Post</Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}></Grid>
                            <List>
                                <ListItem>Title : {post ? post.title : ''}</ListItem>
                                <ListItem>Description : {post ? post.description : ''}</ListItem>
                                <ListItem>Price : {post ? post.price : ''}</ListItem>
                                <ListItem>Location : {post ? post.location : ''}</ListItem>
                                <ListItem>Username : {post ? post.author.username : ''}</ListItem>
                                <ListItem>Id : {post ? post._id : ''}</ListItem>
                                <Button variant="outlined" type="submit" onClick={handleDeleteSubmit} sx={{ ml: 10 }}> Delete </Button>
                            </List>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Delete;
