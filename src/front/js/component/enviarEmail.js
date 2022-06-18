import React, {Component} from "react"; 
import emailjs from "emailjs-com";

export default class EnviarEmail extends Component{
    render() {
        function enviarEmail(e){
            e.preventDdefault();

            emailjs.sendForm(`service_g3hfxdc`, `template_9tqzdbr`, e.target, `irkn6NXJpYy-z_KjF`).then(res =>{
                alert("Se ha enviado su email correctamente");
                console.log(res);
            })
        }
        return (
            <>
            <div className="emailPrueba" style ={{width:"80%", marginTop:"30px"}}>
                <div style ={{width:"50%", backgroundColor:"white", margin:"0 auto", padding:"10px"}}>
                    <h1>Formulario de Contacto:</h1>
                    <hr/>
                    <form onSubmit={enviarEmail}>
                        <div className="form-row">
                            <label><b>Nombre:</b></label>
                            <input type="text" className="from-control" name = "nombre" id = "nombre"></input>
                            
                        </div>
                        <div className="form-row">
                            <label><b>Email:</b></label>
                            <input type="text" className="from-control" name = "email" id = "email"></input>
                            
                        </div>
                        <div className="form-row">
                            <label><b>Mensaje:</b></label>
                            <input type="text" className="from-control" name = "mensaje" id = "mensaje"></input>
                            
                        </div>
                        <button type= "submit" className="btn btn-primary" style = {{width:"50%", margin:"0 auto", marginTop:"20px"}}>Enviar mensaje</button>


                    </form>

                </div>


            </div>
            
            
            
            </>
        )
    }


}