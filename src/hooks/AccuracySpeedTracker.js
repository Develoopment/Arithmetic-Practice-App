import React, { useRef, useEffect } from "react";
import { useAccuracyContext } from "../contexts/accuracyContext";

const useAccuracySpeedTracker = () => {
 
    const currentTime = useRef();
    const totalTimeSpent = useRef(0);
    const noOfQuestionsAnswered = useRef(0);

    useEffect(() => {
        currentTime.current = Date.now();
    }, [])

    const {setAvgSpeed} = useAccuracyContext();

    const calculateSpeedTakenToAnswer = () => {
        // get how long the user took to complete the problem
        const timeSubmitBtnClicked = Date.now();
        const timeToAnswerQuestion = timeSubmitBtnClicked - currentTime.current;
        console.log(timeToAnswerQuestion/1000 + " seconds to answer");
        currentTime.current = timeSubmitBtnClicked;

        // calculate avg speed
        noOfQuestionsAnswered.current += 1;
        totalTimeSpent.current = totalTimeSpent.current + timeToAnswerQuestion;

        // store it in db (TODO)
        setAvgSpeed(Math.trunc(Math.round(totalTimeSpent.current/noOfQuestionsAnswered.current) / 1000));
    }

    return{calculateSpeedTakenToAnswer}
}

export default useAccuracySpeedTracker;