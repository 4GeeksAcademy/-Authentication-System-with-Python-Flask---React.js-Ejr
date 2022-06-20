import React, { Component } from "react";
import emailjs from "emailjs-com";

export default class EnviarEmail extends Component {
    render() {
        function enviarEmail(e) {
            e.preventDefault();

            emailjs.sendForm(`service_g3hfxdc`, `template_9tqzdbr`, e.target, `irkn6NXJpYy-z_KjF`).then(res => {
                alert("Se ha enviado su email correctamente");
                console.log(res);
            })
        }
        return (
            <div>
                <div className="emailPrueba" style={{ width: "800px", marginTop: "30px", border: "1px solid lightgrey", margin:"20px 30% "}}>
                    <div style={{ width: "600px", height:"450px",  backgroundColor: "white", margin: "0 auto"}}>
                        <h1 style= {{textAlign:"center", paddingTop:"20px", paddingBottom:"15px"}}>Formulario de Contacto:</h1>
                        <form onSubmit={enviarEmail}>
                            <div className="form-row">
                                <label><b>Nombre:</b></label>
                                <input type="text" className="form-control" id="nombre" name= "nombre" />

                            </div>
                            
                            <div className="form-row">
                                <label ><b>Email:</b></label>
                                <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com"/>

                            </div>
                            <div className="form-row">
                                <label ><b>Mensaje:</b></label>
                                <textarea  className="form-control" id="mensaje" name="mensaje" rows="3"></textarea>

                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: "50%", margin: "0 auto", marginTop: "20px" }}>Enviar mensaje</button>


                        </form>

                    </div>


                </div>



            </div>
        )
    }


}