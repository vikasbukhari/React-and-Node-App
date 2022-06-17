import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { Container } from '@mui/system';
import { Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';

// 
import { TaskCard } from '../components/Task/TaskCard';
import Header from '../components/templates/Header';

import { useAuth } from '../Contexts/AuthContext';
import {SERVER_URL} from '../Constant';

export default function TaskList() {
    // Get URL params
    const { id } = useParams();

    // Get user from AuthContext
    const { currentUser } = useAuth();

    const [task, setTask] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        getTask()
    }, []);

    async function getTask() {
        setLoading(true);
        fetch(`${SERVER_URL}/task/GetTasks/?username=${id}`)
        .then(res => res.json())
        .then(data => {
            setTask(data);
            setLoading(false);
        }
        )
        .catch(err => {
            console.log(err);
        }
    );
    }


 
  return (
    <>
        <Header/>

            <Container sx={{mt:4}}>
                <Typography variant="h5">Task List of <strong>{id}</strong> </Typography>
            </Container>

            <Container sx={{mt:5}}>

                {loading ? <CircularProgress /> :
                    <>
                        <Container>

                            { task.length < 1 ? <Typography variant="h6">No tasks found for this user!</Typography> : (<></>)}

                            {
                                task.map(task => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        user={currentUser}

                                    />
                                ))
                                
                            }
                        </Container>
                    </>

                }
            </Container>
    </>
  )
}

