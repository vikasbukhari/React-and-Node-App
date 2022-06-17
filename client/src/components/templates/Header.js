import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

// Auth From Context
import { useAuth } from '../../Contexts/AuthContext';

export default function Header() {

  const { currentUser ,logout } = useAuth();


  return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{backgroundColor:'black'}}>
          <Toolbar>
           
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link style={{textDecoration: 'none', color:'white'}} to="/">
                  Task App
                </Link>
              </Typography>

              {currentUser ? (<Button onClick={logout} color="inherit">Logout</Button>):(<></>)}
          </Toolbar>
        </AppBar>
      </Box>
  );
}
