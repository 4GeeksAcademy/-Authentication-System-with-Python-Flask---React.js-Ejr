import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import '../../styles/createItinerary.css';


const CreateItinerary = () =>{
  const [userAnswer, setUserAnswer] = useState('');
  const [questionIndex,setQuestionIndex] = useState(0)

  const questions = [
      'PlaceHolderQuestion',
      'PlaceHolderQuestion',
      'PlaceHolderQuestion',

    ]
    
    
    const handleAnswerInput = (e) => {
      setUserAnswer(e.target.value);
    };

    const askNextQuestion = () => {
      

    }
    


    return (
      <>
        <div className="container">
         <div className="avatar-container" id='avatarcontainer'>
            <div className="card">
              <div className='avatar-box '>
                <div className='avatar me-5' id='avatar'></div> 
                <div className='box n1 ' id='question'>Question</div>
               </div>
                <div className="card-body">
                  <p className="card-text" id='Dio'>Assistant DioDio</p>
                </div>
            </div>
            <div className='card2'>
              <div className='answer-box'>
                <div className='answer-item'> AI Answer </div>
              </div>
            </div>
          
          <input 
            type='text' 
            id='answerInput' 
            placeholder='Your answer'
            value={userAnswer}
            onChange={handleAnswerInput}></input>
          <button>Next Question</button>
         </div>
        </div>
        </>
      );

}
export default CreateItinerary;