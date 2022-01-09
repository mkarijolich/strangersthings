import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const theme = createTheme();

const Home = () => {

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center',mt:10}}>
            <Typography variant="h2"  >Welcome to Stranger Things</Typography>
        </Box>
        </ThemeProvider>
        
    )
}

export default Home;