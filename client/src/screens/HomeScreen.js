import * as React from 'react';
import { Container } from '@mui/system';

// Components
import Header from '../components/templates/Header';  
import AddData from '../components/HomeScreenComponents/AddData';
import LoginRegister from '../components/Auth/LoginRegister';
import AllUsers from '../components/HomeScreenComponents/AllUsers';

import { useAuth } from '../Contexts/AuthContext';

export default function HomeScreen() {

   const { currentUser } = useAuth();

  return (
     <>
         <Header/>
         
            {currentUser ? <AddData/> : <LoginRegister/>}

         <Container>
            <AllUsers 
                  currentUser={currentUser}
            />
         </Container>
     </>
  );
}
