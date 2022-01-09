import React from 'react';
import { useNavigate } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReplyIcon from '@mui/icons-material/Reply';


const theme = createTheme();

let getRandomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);

const Post = (props) => {

    const {
        user,
        post,
        setCurrentPostInput
    } = props

    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            {
                Object.keys(user).length > 0 ?
                    <List sx={{ minWidth: 600 }}>
                        <ListItem component="h2" color="text.secondary">
                            <Avatar sx={{ bgcolor: getRandomColor(), mr: 5 }} aria-label="recipe">
                                {post.author.username[0].toUpperCase()}
                            </Avatar>
                            <div>{post ? post.title : ''}</div>
                        </ListItem>
                        <ListItem>Description : {post ? post.description : ''} </ListItem>
                        <ListItem>Price : {post ? post.price : ''} </ListItem>
                        <ListItem>Location : {post ? post.location : ''}</ListItem>
                        <ListItem>Will Deliver : {post.willDeliver ? 'Yes' : 'No'}</ListItem>
                        <ListItem>Username : {post ? post.author.username : ''}</ListItem>
                        <ListItem>Id : {post ? post._id : ''}</ListItem>

                        {
                            (user.username === post.author.username) ?
                                <IconButton

                                    aria-label="edit"
                                    onClick={() => {
                                        setCurrentPostInput(post); //saving the post data to "editpost" before go to edit page
                                        navigate(`/posts/${post._id}/edit`); //url change
                                    }}>
                                    <EditIcon />
                                </IconButton>
                                : null
                        }

                        {
                            (user.username === post.author.username) ?

                                <IconButton
                                    variant="contained"
                                    onClick={() => {
                                        setCurrentPostInput(post);
                                        navigate(`/posts/${post._id}/delete`);
                                    }}>
                                    <DeleteIcon />
                                </IconButton>
                                : null}

                        {
                            (user.username !== post.author.username) ?
                                <IconButton
                                    onClick={() => {
                                        setCurrentPostInput(post);
                                        navigate(`/posts/${post._id}/message`);
                                    }}>
                                    <EmailOutlinedIcon />
                                </IconButton>
                                : null}
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <Divider />
                        {
                            post.messages.map(msg => {
                                return (
                                    <Box key={msg._id}>
                                        <List>
                                            <Typography sx={{ fontWeight: 'bold' }}>Message</Typography>
                                            <ListItem><Typography variant="subtitle1" >To me : </Typography>{msg.content}<ReplyIcon sx={{ ml: 20 }} />Reply</ListItem>
                                        </List>
                                        <Divider />
                                    </Box>
                                )
                            })
                        }
                    </List>
                    :
                    <List sx={{ minWidth: 600 }}>
                        <ListItem component="h2" color="text.secondary">
                            <Avatar sx={{ bgcolor: getRandomColor(), mr: 5 }} aria-label="recipe">
                                {post.author.username[0].toUpperCase()}
                            </Avatar>
                            <div>{post ? post.title : ''}</div>
                        </ListItem>
                        <ListItem>Description : {post ? post.description : ''} </ListItem>
                        <ListItem>Price : {post ? post.price : ''} </ListItem>
                        <ListItem> Location : {post ? post.location : ''}</ListItem>
                        <ListItem>Will Deliver : {post.willDeliver ? 'Yes' : 'No'}</ListItem>
                        <ListItem>Username : {post ? post.author.username : ''}</ListItem>
                        <ListItem>Id : {post ? post._id : ''}</ListItem>
                        <Divider />
                    </List>
            }
        </ThemeProvider>

    );
}


export default Post;