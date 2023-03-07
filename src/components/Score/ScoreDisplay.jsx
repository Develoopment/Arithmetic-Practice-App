import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAccuracyContext } from '../../contexts/accuracyContext';
import {Card, CardContent, Typography} from '@mui/material';

function ScoreDisplay(){

    const { 
        questionsAnswered, 
        noOfQuestionsCorrect, 
        avgSpeed
    } = useAccuracyContext();

    return(
        <>
            <h1>Score cards here</h1>

            <Card sx={{ minWidth: 275, maxWidth: 400}}>
                <CardContent>
                    <Typography>
                        Accuracy: {(noOfQuestionsCorrect / questionsAnswered)*100}% [{noOfQuestionsCorrect} / {questionsAnswered}]<br/>
                        Average Speed: {avgSpeed} secs
                    </Typography>
                </CardContent>
            </Card>

            <Link to="/"><Button variant="contained">Return</Button></Link>
        </>
    )
}

export default ScoreDisplay;