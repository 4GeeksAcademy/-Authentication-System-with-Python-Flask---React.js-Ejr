import React, {useState,useEffect,useContext} from "react";

import { Context } from "../store/appContext";
const MailSender = () => {
  const { store, actions } = useContext(Context);
  const [trydata, settrydata] = useState({
      "sender":{  
         "name":"AutoAgenda ",
         "email":"autoagenda3@gmail.com"
      },
      "to":[  
         {  
            "email":"thefinalkillcod@gmail.com",
            "name":"steven sanz"
         }
      ],
      "subject":"Hello world",
      "htmlContent":"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Brevo.</p></body></html>"
   })
   const [texto, setTexto] = useState('Texto inicial');

  const cambiarTexto = () => {
    setTexto('Texto cambiado');
    actions.SendMail(trydata)
  };
   return (
    <div className="App">
      <header className="App-header">
        <p>{texto}</p>
        <button onClick={cambiarTexto}>Cambiar Texto</button>
      </header>
    </div>
  );
}

export default MailSender;