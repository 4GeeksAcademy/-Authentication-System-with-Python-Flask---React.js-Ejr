import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import '../../styles/createItinerary.css';
import avatar1 from "../../img/avatar1.png";


const CreateItinerary = () => {
  const [questions, setQuestions] = useState([
    'Where do you want to go?',
    'How many people are there in your group?',
    'How many days do you plan to stay?',
    'What time of the year would you like to go?',
    'What are your interests?',
    'What is your level of fitness?',
    'Please indicate your dietary preferences?',
    'And finally.. your daily budget?',
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);

  const handleAnswerInput = (e) => {
    setUserAnswers(e.target.value);
  };

  const askNextQuestion = async () => {
    setUserAnswers([...userAnswers, userAnswers]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setUserAnswers('');

    if (currentQuestionIndex === questions.length - 1) {

      const response = await fetch('/createItinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userAnswers}),
      });

      const result = await response.json();

      if (response.ok) {

        setGeneratedItinerary(result);
      } else {

        console.error('Error generating itinerary:', result.error);
      }
    }
  };



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
                value={userAnswers}
                onChange={handleAnswerInput}></input>
              <button onClick={askNextQuestion}>Next Question</button>
            </div>
          </div>
          <div className='answer-box'>
            <div className='answer-item'>
            {generatedItinerary ? (
              <div>
                <h3>Generated Itinerary</h3>
                <p>{generatedItinerary}</p>
              </div>
            ) : (
              'AI Answer'
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

}
export default CreateItinerary;