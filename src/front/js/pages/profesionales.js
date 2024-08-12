import React, { useContext, useState } from "react";

import { Context } from '../store/appContext'

import ReactStars from 'react-rating-stars-component';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

//import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
//import '@fullcalendar/interaction/main.css'; // Añadido por si es necesario


const psicologos = [
    {
        img: "https://i.pinimg.com/originals/9e/4b/e4/9e4be45c7fbb46b05aaee2b203a35232.jpg",
        nombre: "Dr. Juan Pérez",
        especialidades: ["Psicología Clínica", "Terapia Cognitivo-Conductual"],
        descripcion: "El Dr. Juan Pérez tiene más de 15 años de experiencia en psicología clínica y es experto en terapia cognitivo-conductual. Ha ayudado a numerosos pacientes a superar trastornos de ansiedad y depresión.",
        calificacion: 4.8
    },
    {
        img: "https://th.bing.com/th/id/OIP.3pTvuODk4tohlb2GjXzhUQHaGv?rs=1&pid=ImgDetMain",
        nombre: "Dra. María García",
        especialidades: ["Psicología Infantil", "Terapia Familiar"],
        descripcion: "La Dra. María García se especializa en psicología infantil y terapia familiar. Con su enfoque comprensivo y empático, ha trabajado con familias para mejorar la comunicación y resolver conflictos.",
        calificacion: 4.7
    },
    {
        img: "https://th.bing.com/th/id/OIP.7kRUafV2fWsF8wi1zH_CewHaE8?w=1500&h=1000&rs=1&pid=ImgDetMain",
        nombre: "Dr. Luis Rodríguez",
        especialidades: ["Psicología Organizacional", "Coaching"],
        descripcion: "El Dr. Luis Rodríguez es un psicólogo organizacional y coach certificado. Ayuda a las empresas a mejorar el rendimiento de sus empleados y a desarrollar líderes efectivos.",
        calificacion: 4.9
    },
    {
        img: "https://media.licdn.com/dms/image/C4D03AQG6bwvCYAJucQ/profile-displayphoto-shrink_800_800/0/1619111773727?e=2147483647&v=beta&t=4YsQKaZyBsL-csV5ud1Pm8M5tqienkoe_dEvHhNNUwI",
        nombre: "Dra. Ana Martínez",
        especialidades: ["Psicología Forense", "Evaluaciones Psicológicas"],
        descripcion: "La Dra. Ana Martínez es especialista en psicología forense y realiza evaluaciones psicológicas para casos legales. Su conocimiento en el campo forense es ampliamente reconocido.",
        calificacion: 3.6
    },
    {
        img: "https://th.bing.com/th/id/OIP.ZqIS8QmJFXUBUT1j292aegHaHa?w=530&h=530&rs=1&pid=ImgDetMain",
        nombre: "Dr. Carlos Gómez",
        especialidades: ["Terapia de Pareja", "Sexología"],
        descripcion: "El Dr. Carlos Gómez se especializa en terapia de pareja y sexología. Ha ayudado a muchas parejas a mejorar su relación y resolver problemas sexuales.",
        calificacion: 4.5
    }
];

const Profesionales = () => {
    const {store, actions} = useContext(Context)

    const [events, setEvents] = useState([
        // Background event to indicate availability
        {
            id: 'available-time',
            start: '2024-08-12T09:00:00',
            end: '2024-08-12T12:00:00',
            display: 'background',
            backgroundColor: '#00FF00', // Color para disponibilidad
        },
        {
            id: 'available-time-2',
            start: '2024-08-13T14:00:00',
            end: '2024-08-13T22:00:00',
            display: 'background',
            backgroundColor: '#00FF00', // Otro bloque de disponibilidad
        },
    ]);


    const handleDateClick = (info) => {
        const start = new Date(info.dateStr);
        const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 minutos en milisegundos
    
        // Filtrar eventos que no son de background
        const nonBackgroundEvents = events.filter(event => event.display !== 'background');
    
        // Verificar si ya hay un evento en el mismo intervalo de tiempo
        const isConflict = nonBackgroundEvents.some(event => {
            const eventStart = new Date(event.start);
            const eventEnd = new Date(event.end);
            return (start < eventEnd && end > eventStart); // Chequeo de conflicto
        });
    
        if (isConflict) {
            alert("No se puede agregar un evento en este intervalo porque ya está ocupado.");
            return;
        }
    
        // Filtrar eventos de background para verificar disponibilidad
        const backgroundEvents = events.filter(event => event.display === 'background');
    
        // Verificar si el horario seleccionado está dentro de la disponibilidad
        const isAvailable = backgroundEvents.some(event => {
            const availableStart = new Date(event.start);
            const availableEnd = new Date(event.end);
            return (start >= availableStart && end <= availableEnd); // Chequeo de disponibilidad
        });
    
        if (!isAvailable) {
            alert("No se puede agregar un evento en este intervalo porque no está dentro de un horario disponible.");
            return;
        }
    
        const newEvent = {
            id: String(events.length + 1), // Asigna un ID único al evento
            title: 'Agustín Alonso',
            start: start.toISOString(),
            end: end.toISOString(),
            allDay: info.allDay
        };
    

        setEvents([...events, newEvent]);
    };
    
    const handleEventClick = (info) => {
        console.log(info)
        // Filtrar y eliminar el evento clickeado
        //const filteredEvents = events.filter(event => event.id !== info.event.id);
        console.log(events)
        setEvents(filteredEvents);
    };

    return (<div className="mt-5">
        <div className="w-75">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick} // Asocia la función para eliminar eventos
            />
        </div>


        {
            store.psicologos.map((elm, index) => {
                return (
                    // console.log(elm)
                    <div className='d-flex justify-content-center' key={index}>

                        <div className="card mb-3 text-start col-10 col-md-8 bg-ligth" style={{ minHeight: '300px' }}>
                            <div className="row g-0 h-100">
                                <div className="col-md-4">
                                    <img src={elm.foto} className="img-fluid rounded-start" alt="..." style={{
                                        minHeight: '300px',
                                        height: '100%',
                                        width: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center'
                                    }} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title my-3">{elm.nombre_usuario} {elm.apellido}</h5>
                                        {/* {elm.especialidades.map((esp, inx) => {
                                            return <h6 className="card-text" key={inx}>{esp}</h6>
                                        })} */}
                                        <p className="card-text"><small className="text-body-secondary">{elm.descripcion}</small></p>
                                        <div className="d-flex justify-content-between align-items-center col-12">
                                            <div className="col-md-8 col-6">
                                                {/* <ReactStars
                                                count={5}
                                                value={elm.calificacion}
                                                size={40}  // Tamaño de las estrellas
                                                isHalf={true}  // Permite calificación en medio punto
                                                activeColor="#ffd700"  // Color de las estrellas activas
                                                edit={false}  // Desactiva la edición
                                            /> */}
                                            </div>
                                            <div className="col-md-4 col-6 text-end">
                                                <button type="button" className="btn btn-outline-success me-5 h-75">Reservar agenda</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
    )
}

export default Profesionales