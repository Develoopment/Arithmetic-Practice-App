import React, { useState, useEffect, useRef } from 'react';
import { generateRandomQuestion } from '../utilities/generateRandomQuestion';
import { useAccuracyContext } from '../contexts/accuracyContext';

const useGetRandQuestions = () => {
    // getting the input field so we can clear it whenever a new question loads
    const [inputField, setInputField] = useState("");

    const [questionLabel, setQuestionLabel] = useState();
    const [userAnswer, setUserAnswer] = useState("");

    // will need to delete this later (this was used for debugging purposes only)
    const [answerLabel, setAnswerLabel] = useState();

    // this state controls the text that prompts if the user solved the problem correctly or not
    const [isCorrect, setIsCorrect] = useState("");

    // gives access to vars keeping track of accuracy
    const { 
        questionsAnswered, 
        noOfQuestionsCorrect, 
        setQuestionsAnswered, 
        setnoOfQuestionsCorrect
    } = useAccuracyContext();

    const loadRandomQuestion = () => {
        const {question, answer} = generateRandomQuestion();
        setAnswerLabel(answer);
        setQuestionLabel(question);
    }

    useEffect(() => {
        
        loadRandomQuestion();
        // setting the number of questions answered to 0 every time page first loads
        setQuestionsAnswered(0);

    },[])

    const handleSubmit = (event) => {

        // increase number of questions answered
        setQuestionsAnswered(questionsAnswered + 1);

        // evaluate the accuracy of the answer
        const userAnswerForEvaluation = parseInt(userAnswer);
        if(answerLabel == userAnswerForEvaluation){
            setIsCorrect("correct");
            setnoOfQuestionsCorrect(noOfQuestionsCorrect + 1);
            
        }else{
            setIsCorrect("wrong");
        }

        // after that clear input, load new question and start counting how long the user takes to answer the question
        setInputField("");
        setUserAnswer("");
        loadRandomQuestion();
    }

    const handleChange = (event) => {
        setUserAnswer(event.target.value);
        setInputField(event.target.value);
    }

    const handleNumberButtonClicked = (event) => {
        // since the user can manually type in an answer
        // or use the buttons
        // this function handles the buttons

        // the input field value is controlled by the inputField state
        // so adding the new value to any already rendered characters
        // console.log(event.target.value);

        setUserAnswer(userAnswer + event.target.value);
        setInputField(userAnswer + event.target.value);
        
        
    }

    return {questionLabel, handleSubmit, handleChange, userAnswer, inputField, handleNumberButtonClicked, isCorrect};
}

export default useGetRandQuestions;