import { border } from "@cloudinary/url-gen/qualifiers/background";
import React from "react";
import ChatBot from "react-simple-chatbot"
import { ThemeProvider } from "styled-components";

const diseñoChat = {
    background: 'white',
    headerBgColor: 'green',
    headerFontColor: 'white',
    headerFontSize: '25px',
    botBubbleColor: '#B1D79C',
    botFontColor: 'black',
    userBubbleColor: 'lightblue',
    userFontColor: 'white',


}
const handleLinkClick = (url) => {
    window.location.href = url;
  };

export const Chat = () => {
    return (
        <ThemeProvider theme={diseñoChat}>
            <ChatBot 
                headerTitle= <strong>🚘 Friendly Wheels Bot</strong>
                steps={[
                    {
                        id: 'intro estatica',
                        component: (
                            <div>
                            <p className="fs-3 text-success"><strong>Hola</strong> 👋🏼</p>
                            <p className="text-success"><cite>Soy el chatbot de Friendly Wheels.</cite></p>
                            </div>
                          ),
                        trigger: 'intro'
                    },
                    {
                        id:'intro',
                        message: '¿Por favor dime cual es tu nombre?',
                        trigger: 'pregunta-nombre'
                    },
                    {
                        id:'pregunta-nombre',
                        user: true,
                        validator: (value) => {
                            if(value.charAt(0) !== value.charAt(0).toUpperCase()) {
                                return "El nombre debe comenzar en mayúscula";
                            }
                            return true;
                        },
                        trigger: 'respuesta-nombre',
                    },
                    {
                        id:'respuesta-nombre',
                        message:'Hola, {previousValue} ¿En qué puedo ayudarte?',
                        trigger: 'respuesta-ayuda'
                    },
                    {
                        id:'respuesta-ayuda',
                        options: [
                            {value:"y", label: "Mi perfil 👨‍💻", trigger:"mensaje-ayuda-perfil"},
                            {value:"n", label: "Alquiler 🚗", trigger:"mensaje-ayuda-alquiler"},
                        ]
                    },
                    {
                        id:'mensaje-ayuda-perfil',
                        message:'Seras redirigido a la opción que elijas',
                        trigger: 'respuesta-ayuda-perfil'
                    },
                    {
                        id:'respuesta-ayuda-perfil',
                        options: [
                            {value:"crearcuenta", label: "Crear una cuenta ➕", trigger: () => handleLinkClick(`${process.env.FRONT_URL}/signup`)},
                            {value:"iniciarsesion", label: "Iniciar sesión ➡️", trigger: () => handleLinkClick(`${process.env.FRONT_URL}/login`)}
                        ]
                    },
                    {
                        id: 'mensaje-ayuda-alquiler',
                        message:'¿Eres arrendatario o propietario?',
                        trigger: 'respuesta-ayuda-alquiler'
                    },
                    {
                        id: 'respuesta-ayuda-alquiler',
                        options: [
                            {value:"arrendatario", label: "Arrendatario 👤", trigger:"mensaje-ayuda-arrendatario"},
                            {value:"propietario", label: "Propietario 👤", trigger:"mensaje-ayuda-propietario"},
                        ]
                    },
                    {
                        id: 'mensaje-ayuda-arrendatario',
                        message:'¿Cómo puedo ayudarte como arrendatario?',
                        trigger: 'respuesta-ayuda-arrendatario'
                    },
                    {
                        id: 'respuesta-ayuda-arrendatario',
                        options: [
                            {value:"formapago", label: "Forma de Pago 💳", trigger:"mensaje-ayuda-forma-pago"},
                            {value:"entrega", label: "Recogida y entrega 🔑", trigger:"mensaje-ayuda-recogida-entrega"},
                            {value:"daños", label: "Daños 🛠️", trigger:"mensaje-ayuda-daños"},
                            {value:"asistenciacarretera", label: "Asistencia en carretera 🆘", trigger:"mensaje-ayuda-asistencia-carretera"}

                        ]
                    },
                    {
                        id: 'mensaje-ayuda-forma-pago',
                        message: 'Cada vez que se acepta una reserva, el importe se deduce de tu tarjeta de pago.Si la reserva se cancela posteriormente, el importe no tiene devolución. ',
                        trigger: 'respuesta-ayuda-forma-pago'
                    },
                    {
                        id: 'respuesta-ayuda-forma-pago',
                        component: (
                            <div>
                                <p className="text-success"><strong>Espero haber sido de ayuda.</strong></p>
                                <p className="text-success"><cite>Hasta la próxima 👋🏼</cite></p>
                                <a href="/" className="text-decoration-none fs-4"><strong>Nuevo Chat 🆕</strong></a>
                            </div>
                        ),
                    },
                    {
                        id: 'mensaje-ayuda-recogida-entrega',
                        message: 'Deberas recoger tu coche en nuestra oficina. Clickea en Nosotros y seras redirijido a nuestra información',
                        trigger: 'respuesta-ayuda-recogida-entrega'
                    },
                    {
                        id: 'respuesta-ayuda-recogida-entrega',
                        options: [
                            {value:"nosotros", label: "Nosotros 📍", trigger: () => handleLinkClick(`${process.env.FRONT_URL}/sobrenosotros`)},
                        ],
                    },
                    {
                        id: 'mensaje-ayuda-daños',
                        message: 'Cuando devuelvas el coche, un trabajador de nuestra empresa se encargara de verificar si el coche ha sufrido daños durante el periodo de alquiler. Si los hubiera, Friendly Wheels se pondrá en contacto contigo para comentar los siguientes pasos.',
                        trigger: 'respuesta-ayuda-daños'
                    },
                    {
                        id: 'respuesta-ayuda-daños',
                        component: (
                            <div>
                                <p className="text-success"><strong>Espero haber sido de ayuda.</strong></p>
                                <p className="text-success"><cite>Hasta la próxima 👋🏼</cite></p>
                                <a href="/" className="text-decoration-none fs-4"><strong>Nuevo Chat 🆕</strong></a>
                            </div>
                        ),
                        end: true
                    },
                    {
                        id: 'mensaje-ayuda-asistencia-carretera',
                        message: "Si necesitas asistencia en carretera, siempre puedes ponerte en contacto con Allianz Seguros, llamando al siguiente teléfono " +
                        "+915 280 253. Deberás indicar la matrícula y que haz alquilado en Friendly Wheels",
                        trigger: 'respuesta-ayuda-asistencia-carretera'
                    },
                    {
                        id: 'respuesta-ayuda-asistencia-carretera',
                        component: (
                            <div>
                                <p className="text-success"><strong>Espero haber sido de ayuda.</strong></p>
                                <p className="text-success"><cite>Hasta la próxima 👋🏼</cite></p>
                                <a href="/" className="text-decoration-none fs-4"><strong>Nuevo Chat 🆕</strong></a>
                        </div>
                        ),
                        end: true
                    },
                    {
                        id: 'mensaje-ayuda-propietario',
                        message: '¿Cómo puedo ayudarle como propietario?',
                        trigger: 'respuesta-ayuda-propietario'
                    },
                    {
                        id: 'respuesta-ayuda-propietario',
                        options: [
                            {value:"daño", label: "Daño 🛠️", trigger:"mensaje-ayuda-daño"},
                            {value:"multa", label: "Multa 🛂", trigger:"mensaje-ayuda-multa"},
                            {value:"limpieza", label: "Limpieza 🧹", trigger:"mensaje-ayuda-limpieza"},
                            {value:"entregadecoche", label: "Donde entrego mi coche 🔑", trigger:"mensaje-ayuda-donde-entrego-mi-coche"},
                            {value:"eliminar", label: "Eliminar coche ✖️", trigger:"mensaje-ayuda-eliminar-coche"}
                        ]
                    },
                    {
                        id: 'mensaje-ayuda-daño',
                        message: 'Si el coche ha sufrido daños durante el periodo de alquiler, el arredantario será responsable del pago de los mismos',
                        trigger: 'respuesta-ayuda-daño',
                    },
                    {
                        id: 'respuesta-ayuda-daño',
                        component: (
                            <div>
                                <p className="text-success"><strong>Espero haber sido de ayuda.</strong></p>
                                <p className="text-success"><cite>Hasta la próxima 👋🏼</cite></p>
                                <a href="/" className="text-decoration-none fs-4"><strong>Nuevo Chat 🆕</strong></a>
                            </div>
                        ),
                        end: true
                    },
                    {
                        id: 'mensaje-ayuda-multa',
                        message: 'Si uno de tus coches ha recibido una multa o un cargo durante el alquiler, el arredantario será responsable del pago de la misma',
                        trigger: 'respuesta-ayuda-multa'
                    },
                    {
                        id: 'respuesta-ayuda-multa',
                        component: (
                            <div>
                                <p className="text-success"><strong>Espero haber sido de ayuda.</strong></p>
                                <p className="text-success"><cite>Hasta la próxima 👋🏼</cite></p>
                                <a href="/" className="text-decoration-none fs-4"><strong>Nuevo Chat 🆕</strong></a>
                            </div>
                        ),
                        end: true
                    },
                    {
                        id: 'mensaje-ayuda-limpieza',
                        message: 'Por regla general, el arrendatario debe devolver el coche en las mismas condiciones en que lo recogió.Si un coche se devuelve muy sucio, el arrendatario se hara cargo del pago de la misma',
                        trigger: 'respuesta-ayuda-limpieza',
                    },
                    {
                        id: 'respuesta-ayuda-limpieza',
                        component: (
                            <div>
                                <p className="text-success"><strong>Espero haber sido de ayuda.</strong></p>
                                <p className="text-success"><cite>Hasta la próxima 👋🏼</cite></p>
                                <a href="/" className="text-decoration-none fs-4"><strong>Nuevo Chat 🆕</strong></a>
                            </div>
                        ),
                        end: true
                    },
                    {
                        id: 'mensaje-ayuda-donde-entrego-mi-coche',
                        message: 'Tu coche deberas entregarlo en nuestra oficina. Clickea en Nosotros y seras redirijido a nuestra información',
                        trigger: 'respuesta-ayuda-entrego-mi-coche'
                    },
                    {
                        id: 'respuesta-ayuda-entrego-mi-coche',
                        options: [
                            {value:"nosotros", label: "Nosotros 📍", trigger: () => handleLinkClick(`${process.env.FRONT_URL}/sobrenosotros`)},
                        ],
                    },
                    {
                        id: 'mensaje-ayuda-eliminar-coche',
                        message: 'Como propietario sigue estos pasos para eliminar un coche',
                        trigger: 'pasos-eliminar-coche'
                    },
                    {
                        id: 'pasos-eliminar-coche',
                        component: (
                            <div>
                                <p className="text-success"><strong>Espero haber sido de ayuda.</strong></p>
                                <p className="text-success"><cite>Hasta la próxima 👋🏼</cite></p>
                                <a href="/" className="text-decoration-none fs-4"><strong>Nuevo Chat 🆕</strong></a>
                            </div>
                          ),
                        trigger:'respuesta-pasos-eliminar-coche'
                    },
                    {
                        id: 'respuesta-pasos-eliminar-coche',
                        component: (
                            <div>
                                <p className="text-success"><strong>Espero haber sido de ayuda.</strong></p>
                                <p className="text-success"><cite>Hasta la próxima 👋🏼</cite></p>
                                <a href="/" className="text-decoration-none fs-4"><strong>Nuevo Chat 🆕</strong></a>
                            </div>
                        ),
                        end: true
                    }
                ]}
                floating={true.toString()}
            />
       </ThemeProvider>
    );
};