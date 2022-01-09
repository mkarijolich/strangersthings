import React from 'react';
import { useEffect, useState } from 'react';
import { getMessage } from "../api/index";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ReplyIcon from '@mui/icons-material/Reply';
import { Divider } from '@mui/material';


const Profile = (props) => {

    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [profileUsername, setProfileUsername] = useState("");


    useEffect(() => {
        Promise.all(
            [
                getMessage()
            ]
        )
            .then(([profileData]) => {

                const messages = profileData.messages;

                let tempSentMessages = [];
                let tempReceivedMessages = [];

                messages.forEach(message => {
                    if (message.fromUser.username === profileData.username) {
                        tempSentMessages.push(message)

                    } else {
                        tempReceivedMessages.push(message);
                    }
                });

                setSentMessages(tempSentMessages);
                setReceivedMessages(tempReceivedMessages);
                setProfileUsername(profileData.username);

            })
    }, [])

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    return (

        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>

            <Grid container spacing={2}>
                <Grid item xs={4} sx={{ mt: 4 }} >
                    <Item>
                        <Avatar sx={{ bgcolor: red[500], width: 112, height: 112, m: "auto", mb: 5, mt: 10, fontSize: 48 }} >
                            {profileUsername[0]}

                        </Avatar>

                        <Typography variant="h6" color="text.secondary">
                            {profileUsername}'s Profile
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {profileUsername}@gmail.com
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 6 }}>

                            You have {receivedMessages.length} message received.
                        </Typography>

                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            You have {sentMessages.length} message sent.
                        </Typography>
                        <IconButton aria-label="add to favorites" >
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </Item>
                </Grid>


                <Grid item xs={8} sx={{ mt: 4 }}>
                    <Grid item xs={12}>
                        <Item>
                            <Typography sx={{ fontWeight: 'bold' }}>Received</Typography>

                            <List>


                                {
                                    receivedMessages.map(msg => {
                                        return (
                                            <Box key={msg._id}>
                                                <List>
                                                    <ListItem>
                                                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }} >Title : </Typography>{msg.post.title}</ListItem>
                                                    <ListItem><Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Message : </Typography>{msg.content}</ListItem>
                                                </List>
                                                <ListItem><ReplyIcon />Reply</ListItem>
                                                <Divider />
                                            </Box>
                                        )


                                    })
                                }


                            </List>
                        </Item>

                        <Item>
                            <Typography sx={{ fontWeight: 'bold' }}>Sent</Typography>
                            <List>

                                {
                                    sentMessages.map(msg => {
                                        return (
                                            <Box key={msg._id}>
                                                <List>
                                                    <ListItem>
                                                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }} >Title : </Typography>{msg.post.title}</ListItem>
                                                    <ListItem><Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Message : </Typography>{msg.content}</ListItem>
                                                </List>
                                                <Divider />
                                            </Box>
                                        )
                                    })
                                }
                            </List>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Profile;