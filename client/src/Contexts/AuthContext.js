import React, { useContext, useEffect, useState } from 'react';

import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import { CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';


const AuthContext = React.createContext();


export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    
    const [currentUser, setCurrentUser] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    // Show modal if username is not in local storage
useEffect(() => {

        setLoading(true);

        // Get Logged In User from local storage
        const user = localStorage.getItem('currentUser');
        if(user){
            setCurrentUser(user);
            setUsername(user);
            setLoading(false);
        }

        if(localStorage.getItem('username')){
            setUsername(localStorage.getItem('username'));
            setLoading(false);
        }else{
            // Ask for username
            Swal.fire({
                title: 'Welcome back!',
                text: 'Please enter your username',
                input: 'text',
                inputPlaceholder: 'Username',
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!'
                    }
                }
            }).then((result) => {
                if (result.value) {
                    setUsername(result.value);
                    localStorage.setItem('username', result.value);
                    setLoading(false);
                }
            })
        }


    }, [])


    // Login
async function login(username, password){
        
        // Validation Rules
        if(username === '' || password === ''){
            Swal.fire({
                title: 'Error',
                text: 'Please fill in all fields',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }

        // Login
        const response = await fetch('http://localhost:3000/Auth/Login', {
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
            setCurrentUser(username);
            localStorage.setItem('currentUser', username);            

        }else{
            Swal.fire({
                title: 'Error',
                text: data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    
    }

    // Function to Logout
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    }



    const value = {
        login,
        username,
        currentUser,
        logout
        
    };

    return (
      <AuthContext.Provider value={value}>
          {/* Is loading */}
            {loading? (
              <><Container maxWidth="sm" sx={{mt:10,}}>
              <Paper sx={{p:6, textAlign: 'center'}} elevation={0}>
                <CircularProgress />
                </Paper>
              
              </Container>
                    
                  </>
            ): (
                children
            )}
      </AuthContext.Provider>
  )
}



