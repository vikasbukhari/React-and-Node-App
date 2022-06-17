import React from 'react'
import { Container } from '@mui/system'
import { Button, Switch } from '@mui/material'
import {Paper} from '@mui/material'
import {TextField} from '@mui/material'
import axios from 'axios';
import Swal from 'sweetalert2';

import { useAuth } from '../../Contexts/AuthContext';

import {SERVER_URL} from '../../Constant';

export default function AddData() {

  const { currentUser } = useAuth();

  const [taskName, setTaskName] = React.useState('');
  const [taskDescription, setTaskDescription] = React.useState('');
  const [taskDate, setTaskDate] = React.useState('');
  const [FormNumber, setFormNumber] = React.useState('');
  
  const [isFormNumber, setIsFormNumber] = React.useState(false);
  const [isAddingData, setIsAddingData] = React.useState(false);

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsAddingData(true);
    // Add Task

    const taskData = {
      username: currentUser,
      task: taskName,
      date: taskDate,
      description: taskDescription
    }

  
  // Validation
    if(taskName === '' || taskDate === '' || taskDescription === ''){
      Swal.fire({
        title: 'Error',
        text: 'Please fill in all fields',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      setIsAddingData(false);
      return;
    }

    // Check if Date is in future

    let date = new Date(taskDate);
    let today = new Date();
    if(date < today){
      Swal.fire({
        title: 'Date Error! Cannot Be In Past.',
        text: 'Date must be in the future',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      setIsAddingData(false);
      return;
    }

  //  Post Data using axios
   axios.post(`${SERVER_URL}/task/AddTask/`, taskData)
    .then(res => {
      if(res.data.success){
        Swal.fire({
          title: 'Success',
          text: 'Task Added Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }else{
        Swal.fire({
          title: 'Error',
          text: 'Error Adding Task',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }

      setIsAddingData(false);
    })
    .catch(err => {
      Swal.fire({
        title: 'Error',
        text: 'Error Adding Task',
        icon: 'error',
        confirmButtonText: 'Ok'
      })

      setIsAddingData(false);
    })
    

  }


  return (
    <>
      <Container>
        <Paper sx={{p:2, mt:2}} variant='outlined' elevation={0}>
          <h5>Let's start adding your tasks.</h5>
                
                {/* Form to add task details0 */}
                  <Container >


                      <TextField 
                        id="outlined-basic" 
                        label="Task Name" 
                        variant="outlined" 
                        sx={{m:1}}
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                       />

                      <TextField
                        id="date"
                        label="Date"
                        type="date"
                        // Defaut Date Today
                        defaultValue={new Date().toDateString()}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{m:1}}
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                       />
                      <TextField
                          id="filled-multiline-flexible"
                          label="Task Description"
                          multiline
                          maxRows={4}
                          sx={{m:1}}
                          value={taskDescription}
                          onChange={(e) => setTaskDescription(e.target.value)}
                        />
                 </Container>
                      
                  <Container>
                      <Button 
                          variant='contained' 
                          color='primary'
                          sx={{m:1}}
                          onClick={handleSubmit}
                        >
                          Add Task
                      </Button>

                  </Container>
              
        </Paper>
      </Container>
    
    </>
  )
}
