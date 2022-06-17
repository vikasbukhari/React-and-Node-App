import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea } from '@mui/material';
import Chip from '@mui/material/Chip';
import Swal from 'sweetalert2';
import { EditTaskDialog } from './EditTask';


export function TaskCard(props) {

    const { task } = props;
    const [remainingTime, setRemainingTime] = React.useState(0);
    let timeRemaining = task.date;

    // Find Remaining Time From Date
    setInterval(() => {
        let remainingTime = new Date(timeRemaining).getTime() - new Date().getTime();
        let remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        let remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        let remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        
        let RemainingTime = `${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`;
        setRemainingTime(RemainingTime);
    }
    , 1000);


return (
        <Card sx={{ p:1, mt:2}} variant='outlined'>
                <CardActionArea>
                    <CardContent >
                    Time Remaning: <Chip size='small' label={remainingTime} />
                     <h4>{task.FormNumber}</h4>
                     <h3>
                        {task.task}
                     </h3>
                    <Button
                    // Show Full Details as Popup
                    onClick={() => {
                        Swal.fire({
                            title: 'Task Details',
                            html: `
                            <h3>Form Number: ${task.FormNumber}</h3>
                            <h5>Task Name: ${task.task}</h5>
                            
                            <h5>Date: ${task.date}</h5>
                            <h5>Time Remaining: ${remainingTime}</h5>

                            <h5>Task Description: ${task.description}</h5>
                            `,
                            confirmButtonText: 'Ok'
                        })
                        }

                        }

                        sx={{mt:2}}
                        variant='outlined' 
                        size='small'>
                            View Task
                        </Button>

                        {
                            props.user === task.username ?  (
                                <EditTaskDialog 
                                    task={task}
                                />
                            ) :(<></>)
                        }
                    
                    </CardContent>
                </CardActionArea>
                
        </Card>
    )
}