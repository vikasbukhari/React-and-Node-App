import React from 'react'
import { Container } from '@mui/system'
import { TextField } from '@mui/material'
import {Button} from '@mui/material'
import {Alert} from '@mui/material'
import Swal from 'sweetalert2'
import {SERVER_URL} from '../../Constant'

export default function Register(props) {

    const [username, setUsername] = React.useState(props.username);
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');

    const [isLoggingIn, setIsLoggingIn] = React.useState(false);

    async function HandleRegister(){
        setIsLoggingIn(true);
        // Validation Rules
        if(username === '' || password === '' || repeatPassword === ''){
            Swal.fire({
                title: 'Error',
                text: 'Please fill in all fields',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            setIsLoggingIn(false);

            return;
        }        
        
        // Check If Username is greater then 5 characters
        if(username.length < 5){
            Swal.fire({
                title: 'Error',
                text: 'Username must be greater then 5 characters',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            setIsLoggingIn(false);

            return;
        }

        // Check If Password is greater then 5 characters
        if(password.length < 5){
            Swal.fire({
                title: 'Error',
                text: 'Password must be greater then 5 characters',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            setIsLoggingIn(false);

            return;
        }

        // Check if password and repeat password match
        if(password !== repeatPassword){
            Swal.fire({
                title: 'Error',
                text: 'Passwords do not match',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            setIsLoggingIn(false);

            return;
        }

        try{
            RegisterUser(username, password);
            setIsLoggingIn(false);

        }catch(err){
            console.log(err);
            setIsLoggingIn(false);

        }

    }

    // Register Function

async function RegisterUser(username, password){
        try{
            const response = await fetch(`${SERVER_URL}/Auth/Register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            const data = await response.json();
            if(data.success){
                Swal.fire({
                    title: 'Success',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            }else{
                Swal.fire({
                    title: 'Error',
                    text: data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        }catch(err){
            console.log(err);
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
                <TextField 
                    id="outlined-basic" 
                    label="Repeat Password" 
                    variant="outlined" 
                    type={'password'} 
                    required
                    sx={{m:1}}
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
               
            </Container>

            <Button 
                variant='contained'
                color='primary'
                sx={{m:4}}
                onClick={HandleRegister}
                disabled={isLoggingIn}
            >
                Register
            </Button>
    
    </>
  )
}
