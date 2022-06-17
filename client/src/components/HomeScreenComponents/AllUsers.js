import React from 'react'
import { Container } from '@mui/system'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {CircularProgress} from '@mui/material';
import { Link, Navigate } from "react-router-dom";
import { SERVER_URL } from '../../Constant';

export default function AllUsers(props) {

    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => { 
        getUsers()
    }, [props.currentUser]);

    async function getUsers() {
        fetch(`${SERVER_URL}/users`)
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);

            })
            .catch(err => {
                console.log(err);
            }
        );
    }


  return (
    <>
        <Container>
            <h2>All Users</h2>

            {loading ? <CircularProgress /> : 
                <>
                    <Container sx={{display:'flex', flexDirection:{xl:'row',lg:'row',xs:'column', md:'column', sm:'column'}}}>
                        {
                            users.map(user => (
                                <UserCardComponent
                                    key={user.username}
                                    user={user.username}
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


export function UserCardComponent(props) {

    return (
        <Card sx={{p:1, m:2, flex:1}} variant='outlined'>
                <CardActionArea>
                    <CardContent>
                        <Typography variant="p" >
                            {/* Short String */}
                            {
                                props.user.length > 6 ?
                                    props.user.substring(0, 20) + '...'
                                :
                                props.user
                            }
                        </Typography>
                        
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Link to={`/tasklist/${props.user}`}>
                        
                            <Button 
                                size="small"
                                color="primary">
                                    View All Tasks
                            </Button>

                    </Link>
                </CardActions>
        </Card>
    )
}
