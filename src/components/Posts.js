import React from 'react';
import { useEffect } from 'react';
import Post from "../components/Post";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fetchAllPosts } from '../api';

const theme = createTheme();

const Posts = (props) => {

    const {
        posts,
        setCurrentPostInput,
        user,
        setPosts,
        setFilteredPosts
    } = props;

    useEffect(() => {
        fetchAllPosts().then(posts => {
            setPosts(posts);
            setFilteredPosts(posts)
        })
      }, [setPosts, setFilteredPosts])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">Posts</Typography>
                    <p> There are {posts ? posts.length : 0} posts.</p>
                    {
                        posts ?
                            posts.map(post =>
                                <Post key={post._id} post={post} setCurrentPostInput={setCurrentPostInput} user={user} />
                            )
                            : null
                    }
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Posts;