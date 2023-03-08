import React, {useEffect, useRef, useState} from 'react';
import { TextField, Button } from '@mui/material';
import {Link} from "react-router-dom";
import DoneIcon from '@mui/icons-material/Done';
import useGetRandQuestions from '../../hooks/RandomQuestions';
import useAccuracySpeedTracker from '../../hooks/AccuracySpeedTracker';
import { useAccuracyContext } from '../../contexts/accuracyContext';
import { addScore } from '../../utilities/firebase';
import { useAuth } from '../../contexts/userContext';

function QuestionSpam(){

    const{questionLabel, 
        handleSubmit, 
        handleChange, 
        userAnswer, 
        inputField, 
        handleNumberButtonClicked, 
        isCorrect} = useGetRandQuestions();

    const {calculateSpeedTakenToAnswer} = useAccuracySpeedTracker();

    // this info is updated by the other hooks and will be added to the db
    const{questionsAnswered, avgSpeed, noOfQuestionsCorrect} = useAccuracyContext();
    const {currentUser} = useAuth();

    return(
        <div className='questionSpamContainer'>

            <h1>{questionLabel}</h1>

            <TextField label="Answer will show up here" variant="outlined" onKeyPress={(e) => {
                if(e.key === "Enter"){
                    handleSubmit(e);
                    calculateSpeedTakenToAnswer();
                }}} onChange={(e) => handleChange(e)} value={inputField}/>

            <div className='inputPad'>
                <Button variant="contained" value="1" onClick={handleNumberButtonClicked}>1</Button>
                <Button variant="contained" value="2" onClick={handleNumberButtonClicked}>2</Button>
                <Button variant="contained" value="3" onClick={handleNumberButtonClicked}>3</Button>

                <Button variant="contained" value="4" onClick={handleNumberButtonClicked}>4</Button>
                <Button variant="contained" value="5" onClick={handleNumberButtonClicked}>5</Button>
                <Button variant="contained" value="6" onClick={handleNumberButtonClicked}>6</Button>

                <Button variant="contained" value="7" onClick={handleNumberButtonClicked}>7</Button>
                <Button variant="contained" value="8" onClick={handleNumberButtonClicked}>8</Button>
                <Button variant="contained" value="9" onClick={handleNumberButtonClicked}>9</Button>

                <Button variant="contained" value="0" onClick={handleNumberButtonClicked}>0</Button>

                <Button variant="contained" onClick={(e) => {
                    handleSubmit(e);
                    calculateSpeedTakenToAnswer();
                    
                    }}>Submit</Button>
            </div>

            <h2>{userAnswer}</h2>

            <h2>{isCorrect}</h2>

            <Link to="/"><Button variant="contained" onClick={() => {
                calculateSpeedTakenToAnswer();

                const accuracy = (noOfQuestionsCorrect / questionsAnswered)*100;
                // calculate accuracy
                // add this information to the scores array of the logged user's document
                const newScore = {
                    questionsAnswered,
                    noOfQuestionsCorrect,
                    avgSpeed,
                    accuracy
                }
                addScore(currentUser.uid, newScore);
            }} endIcon={<DoneIcon/>}>Done</Button></Link>
        </div>
    )
}

export default QuestionSpam;