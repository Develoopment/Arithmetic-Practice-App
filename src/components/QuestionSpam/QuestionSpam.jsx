import React, {useEffect, useRef, useState} from 'react';
import { TextField, Button } from '@mui/material';
import {Link} from "react-router-dom";
import DoneIcon from '@mui/icons-material/Done';
import useGetRandQuestions from '../../hooks/RandomQuestions';
import useAccuracySpeedTracker from '../../hooks/AccuracySpeedTracker';
import { useAccuracyContext } from '../../contexts/accuracyContext';
import { addScore } from '../../utilities/firebase';
import { useAuth } from '../../contexts/userContext';
import styles from "./questionSpam.module.scss"

const operationButtonStyles = {
    "backgroundColor" : "#FF9500",
    "&:hover":{"backgroundColor" : "#FFAD2F"}
};

const numberButtonStyles = {
    "backgroundColor" : "#505050", 
    "borderRadius" : "50%", 
    "fontSize" : "1.5em",
    "&:hover" : {"backgroundColor" : "#7b7b7b"}
};

const textFieldStyles = {
    "backgroundColor" : "white",
    "height" : "70%",
    "width" : "50%",
    "alignSelf": "center"
}

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
        <div className={styles.questionSpamContainer}>

            <div className={styles.questionWrapper}>
                <h1 className={styles.questionLabel}>{questionLabel}</h1>

                <TextField sx={textFieldStyles} variant="outlined" onKeyPress={(e) => {
                    if(e.key === "Enter"){
                        handleSubmit(e);
                        calculateSpeedTakenToAnswer();
                    }}} onChange={(e) => handleChange(e)} value={inputField}/>
            </div>

            <div className={styles.inputPad}>
                <Button sx={numberButtonStyles} className={styles.gridItem} variant="contained" value="1" onClick={handleNumberButtonClicked}>1</Button>
                <Button sx={numberButtonStyles} className={styles.gridItem} variant="contained" value="2" onClick={handleNumberButtonClicked}>2</Button>
                <Button sx={numberButtonStyles} className={styles.gridItem} variant="contained" value="3" onClick={handleNumberButtonClicked}>3</Button>

                <Button sx={numberButtonStyles} className={styles.gridItem} variant="contained" value="4" onClick={handleNumberButtonClicked}>4</Button>
                <Button sx={numberButtonStyles} className={styles.gridItem} variant="contained" value="5" onClick={handleNumberButtonClicked}>5</Button>
                <Button sx={numberButtonStyles} className={styles.gridItem} variant="contained" value="6" onClick={handleNumberButtonClicked}>6</Button>

                <Button sx={numberButtonStyles} className={styles.gridItem} variant="contained" value="7" onClick={handleNumberButtonClicked}>7</Button>
                <Button sx={numberButtonStyles} className={styles.gridItem} variant="contained" value="8" onClick={handleNumberButtonClicked}>8</Button>
                <Button sx={numberButtonStyles} className={styles.gridItem} variant="contained" value="9" onClick={handleNumberButtonClicked}>9</Button>
                
                <Button sx={numberButtonStyles} className={`${styles.gridItem}`} variant="contained" value="." onClick={handleNumberButtonClicked}>.</Button>
                <Button sx={numberButtonStyles} className={`${styles.gridItem} ${styles.zeroBtn}`} variant="contained" value="0" onClick={handleNumberButtonClicked}>0</Button>
                <Button sx={numberButtonStyles} className={`${styles.gridItem}`} variant="contained" value="-" onClick={handleNumberButtonClicked}>-</Button>

            </div>
            
            <div className={styles.operationsWrapper}>
                <Button sx={{"height" : "100%"}} variant="contained" onClick={(e) => {
                    handleSubmit(e);
                    calculateSpeedTakenToAnswer();
                        
                }}>Submit</Button>

                {/* <h2>{userAnswer}</h2> */}

                <Link to="/" style={{"textDecoration" : "none"}}><Button variant="contained" onClick={() => {
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
                }} sx={operationButtonStyles} endIcon={<DoneIcon/>}>Done</Button></Link>
            </div>
        
            <h2 className={styles.correctLabel}>{isCorrect}</h2>
        </div>
    )
}

export default QuestionSpam;