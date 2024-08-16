// import React, {useState,useEffect,useContext} from "react";

// import { Context } from "../store/appContext";
const MailSender = () => {
  // const { store, actions } = useContext(Context);
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
  //  actions.SendMail(trydata)

   // fetch a la api me traigo los datos del user de la cita y el coche

  
  // const cambiarTexto = () => {
  //   setTexto('Texto cambiado');
    
  // };
  //  return (
  //   <div className="App">
  //     <header className="App-header">
  //       <p>{texto}</p>
  //       <button onClick={cambiarTexto}>Cambiar Texto</button>
  //     </header>
  //   </div>
  // );
}

export default MailSender;