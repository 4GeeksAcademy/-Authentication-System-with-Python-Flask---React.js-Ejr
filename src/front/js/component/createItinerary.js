import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import '../../styles/createItinerary.css';
import avatar1 from "../../img/avatar1.png";


const CreateItinerary = () => {

  const [questions, setQuestions] = useState([
    'Where do you want to go?',
    'How many people are there in your group?',
    'How many days do you plan to stay?',
    'What time of the year would you like to go?'

  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);


  const handleAnswerInput = (e) => {
    setUserAnswer(e.target.value);
  };

  const askNextQuestion = () => {


  }



  return (
    <>
      <div className="container">
        <div className="avatar-container" id='avatarcontainer'>
          <div className="card mb-5">
            <div className='avatar-box '>
              <div className='avatar me-5' id='avatar-placeholder'><img src={avatar1} alt="avatar" id='avatar' /> </div>
              <div className='box n1 ' id='question'>
                {questions[currentQuestionIndex]}
              </div>
            </div>
            <div className="card-body">
              <p className="card-text" id='Dio'>Assistant DioDio</p>
              <input
                type='text'
                id='answerInput'
                placeholder='Your answer'
                value={userAnswer}
                onChange={handleAnswerInput}></input>
              <button onClick={askNextQuestion}>Next Question</button>
            </div>
          </div>
          <div className='answer-box'>
            <div className='answer-item'> AI Answer </div>
          </div>
        </div>
      </div>
    </>
  );

}
export default CreateItinerary;