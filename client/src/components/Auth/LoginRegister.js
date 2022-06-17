import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { Paper, Typography } from '@mui/material';

// Screens
import Register from './Register';
import Login from './Login';

import { useAuth } from '../../Contexts/AuthContext'


export default function LoginRegister() {

    const { currentUser, username } = useAuth();
    const [value, setValue] = React.useState('Login');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


  return (
    <>
    <Container sx={{mt:3}}>

        <Paper variant='outlined' sx={{p:2}}>


                <Box sx={{ width: '100%' }}>
                    <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value="Login" label="Login" />
                            <Tab value="Register" label="Create Account" />
                    </Tabs>
                </Box>

                {value === 'Login' && <Login />}
                {value === 'Register' && <Register username={username} />}
        </Paper>
    </Container>


    </>
  )
}
