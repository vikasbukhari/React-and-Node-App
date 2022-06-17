import React from 'react'
import { Button } from '@mui/material';
import { Container } from '@mui/system';
import Swal from 'sweetalert2';
import { Dialog } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { TextField } from '@mui/material';
import {SERVER_URL} from '../../Constant';


export function EditTaskDialog(props) {
    const { task } = props;

    const [open, setOpen] = React.useState(false);
    const [taskName, setTaskName] = React.useState(task.task);
    const [taskDate, setTaskDate] = React.useState(task.date);  
    const [taskFormNumber, setTaskFormNumber] = React.useState(task.FormNumber);
    const [taskDescription, setTaskDescription] = React.useState(task.description);
   
    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        fetch(`${SERVER_URL}/task/EditTask`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: task.id,
                task: taskName,
                date: taskDate,
                FormNumber: taskFormNumber,
                description: taskDescription,
                username: task.username
            })
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    title: 'Task Updated',
                    text: 'Task Updated Successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                setOpen(false);
                // Navigate to HomeScreen

                // Refresh the page
                window.location.reload();
                
            }
            )
    }
    
    return (
        <>
            <Button sx={{mt:2, ml:1}} variant='outlined' size='small' onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    <Container>
                    <TextField 
                        id="taskName" 
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
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{m:1}}
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                       />
                      <TextField
                          id="taskDescription"
                          label="Task Description"
                          multiline
                          maxRows={4}
                          sx={{m:1}}
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    
                        />
                    </Container>
                    <Button onClick={handleSubmit} sx={{mt:2}} fullWidth variant='outlined'>
                        Update
                    </Button>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}