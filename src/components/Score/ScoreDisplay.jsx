import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import {Card, CardContent, Typography, CircularProgress} from '@mui/material';
import {useAuth} from "../../contexts/userContext" 
import { getUser } from '../../utilities/firebase';
import styles from "./scoreDisplay.module.scss"

function ScoreDisplay(){

    // this is a bad way to do it but here it is
    // get the user document everytime they navigate to the score screen (this will ensure the latest scores are always displayed)
    // this would be better done with a onSnapshot, but figure that out later
    const {currentUser, setCurrentUser} = useAuth();
    useEffect(() => {
        
        const fetchScores = async () => {
            try{
                const refreshedUser = await getUser(currentUser.uid);
                setCurrentUser(refreshedUser);
            }catch(e){
                alert(e);
                console.log(`something's wrong at score displayL: ${e}`)
            }
        }

        fetchScores();

    }, [])

    return(
        <>
            <h1>Scores</h1>

            {currentUser.scores.map(score => {
                return(
                    <Card key={score} sx={{ minWidth: 275, maxWidth: 400}}>
                        <CardContent>
                            <Typography>
                                Accuracy: {score.accuracy}% [{score.noOfQuestionsCorrect} / {score.questionsAnswered}]<br/>
                                <CircularProgress variant='determinate' color={"success"} value={score.accuracy}/>
                                Average Speed: {score.avgSpeed} miliseconds
                            </Typography>
                        </CardContent>
                    </Card>
                )
            })}

            <Link to="/"><Button variant="contained">Return</Button></Link>
        </>
    )
}

export default ScoreDisplay;