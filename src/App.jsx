import React from 'react';
import './App.css'
import Menu from './components/Menu/Menu';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import QuestionSpam from './components/QuestionSpam/QuestionSpam';
import { AccuracyProvider } from './contexts/accuracyContext';
import ScoreDisplay from './components/Score/ScoreDisplay';
import LogUp from './components/LogUp/LogUp';
import { useAuth } from './contexts/userContext';

function App() {

  const{currentUser} = useAuth();

  return (
    <AccuracyProvider>

      {currentUser ? <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Menu/>}/>
            <Route exact path="/question-spam" element={<QuestionSpam/>} />
            <Route exact path="/score" element={<ScoreDisplay/>} />
          </Routes>
        </Router>
      </div> : <LogUp/>}
      
    </AccuracyProvider>
  )
}

export default App
