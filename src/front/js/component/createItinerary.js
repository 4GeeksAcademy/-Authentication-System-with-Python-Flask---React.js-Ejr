import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import '../../styles/createItinerary.css';
import avatar1 from "../../img/avatar1.png";


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
            <div className="card mb-5">
              <div className='avatar-box '>
                <div className='avatar me-5' id='avatar-placeholder'><img src={avatar1} alt="avatar" id='avatar' /> </div> 
                <div className='box n1 ' id='question'>Whats your favorite food?</div>
               </div>
                <div className="card-body">
                  <p className="card-text" id='Dio'>Assistant DioDio</p>
                  <input 
                    type='text' 
                    id='answerInput' 
                    placeholder='Your answer'
                    value={userAnswer}
                    onChange={handleAnswerInput}></input>
                   <button>Next Question</button>
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