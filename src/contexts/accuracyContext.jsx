import React, {useContext, useState} from 'react'

const accuracyInfoContext = React.createContext();

export function useAccuracyContext(){
    return useContext(accuracyInfoContext);
}

export function AccuracyProvider({children}) {

  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [noOfQuestionsCorrect, setnoOfQuestionsCorrect] = useState(0);

  const [avgSpeed, setAvgSpeed] = useState(0);

  const value = {
    questionsAnswered,
    noOfQuestionsCorrect, 
    setQuestionsAnswered, 
    setnoOfQuestionsCorrect,
    avgSpeed,
    setAvgSpeed
  }

  return (
    <accuracyInfoContext.Provider value={value}>
        {children}
    </accuracyInfoContext.Provider>
  )
}
