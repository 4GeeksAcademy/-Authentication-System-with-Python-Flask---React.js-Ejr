import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import '../../styles/createItinerary.css';


const CreateItinerary = () =>{
  const [userAnswer, setUserAnswer] = useState('');
    
  const question = [
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
            <div className='avatar' id='avatar'></div> 
            
                <div className="card-body">
                  <p className="card-text">Assistant DioDio</p>
                </div>
            </div>
            <div className='talk-bubble tri-right left-in' id='question'></div>
          
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