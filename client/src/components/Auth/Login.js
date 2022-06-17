import React from 'react'
import { Container } from '@mui/system'
import { TextField } from '@mui/material'
import {Button} from '@mui/material'
import {Alert} from '@mui/material'
import Swal from 'sweetalert2'

import { useAuth } from '../../Contexts/AuthContext'

export default function Login() {

  const {login} = useAuth();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  async function HandleLogin(){
    setIsLoggingIn(true);
    // Validation Rules
    if(username === '' || password === ''){
      Swal.fire({
        title: 'Error',
        text: 'Please fill in all fields',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      setIsLoggingIn(false);
    }

    try{
      const response = await login(username, password);
      setIsLoggingIn(false);

    }catch(error){
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      setIsLoggingIn(false);
    }
  }

  return (
    <>
       <Container sx={{mt:3}}>

                <TextField 
                    id="outlined-basic" 
                    label="Username" 
                    variant="outlined" 
                    required
                    sx={{m:1}}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <TextField 
                    id="outlined-basic" 
                    label="Password" 
                    variant="outlined" 
                    type={'password'}
                    required
                    sx={{m:1}}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

       </Container>

            <Button 
                variant='contained'
                color='primary'
                sx={{m:4}}
                onClick={HandleLogin}
                disabled={isLoggingIn}
            >
                Login
            </Button>

    </>
  )
}
