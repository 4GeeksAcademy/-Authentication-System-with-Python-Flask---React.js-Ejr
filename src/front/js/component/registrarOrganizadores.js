import React, { useState } from "react";
import '../../styles/accountpage.css'
import "../../styles/registrarOrganizadores.css";
const RegistrarOrganizadores = () => {

    const teamsData = [
        {
            id: 1,
            name: 'JAM ON IT',
            country: 'Colombia',
            registrationDate: '13/11/2023',
            endDate: '16/11/2023',
            shortDescription: "",
            startDate: "",
            location: "",
            logo: "",
            longDescription: "",
            rules: "",
            registrationDate: "",
            registrationStatus: ""

        },
        {
            id: 2,
            name: 'The Last Game',
            country: 'Las Vegas',
            registrationDate: '13/11/2024',
            endDate: '16/11/2023',
            shortDescription: "",
            startDate: "",
            location: "",
            logo: "",
            longDescription: "",
            rules: "",
            registrationDate: "",
            registrationStatus: ""

        },

        {
            id: 3,
            name: 'Costa Rica tournament',
            country: 'Costa Rica',
            registrationDate: '13/11/2024',
            endDate: '16/11/2023',
            shortDescription: "",
            startDate: "",
            location: "",
            logo: "",
            longDescription: "",
            rules: "",
            registrationDate: "",
            registrationStatus: ""
        },
    ];
    const [selectedEvent, setSelectedEvent] = useState(teamsData[0]);
    const handleEdit = (e) => {
        setSelectedEvent(teamsData.find(t => t.id == e.target.id))
    }

    const deleteTodo = (id) => {
        const newTodos = todoArray.filter(todo => todo.id == id)
        setTodoArrays(newTodos)
    }
    const handleChange = (e, propertyName) => {
        const currentEvent = Object.assign({}, selectedEvent);
        currentEvent[propertyName] = e.target.value;
        setSelectedEvent(currentEvent)
    }
    return (
        <div className="fatherBody">
            <div className="row">
                <div className="col-3"> </div>
                <div className="col-3"> </div>
                <div className="col-3"> <button id="buttonNew" className="btn btn-primary">
                    Nuevo
                </button> </div>
                <div className="col-3"> </div>
            </div>


            <table className="table align-middle mb-0 bg-white" id='teamstable'>
                <thead className="bg-light">
                    <tr>
                        <th>Nombre del Evento</th>
                        <th>País</th>
                        <th>Fecha de registro</th>
                        <th>Costo</th>
                    </tr>
                </thead>
                <tbody>
                    {teamsData.map((team) => (
                        <tr key={team.id}>
                            <td>
                                <div className="d-flex align-items-center">
                                    <img
                                        src={`https://mdbootstrap.com/img/new/avatars/${team.id}.jpg`}
                                        alt=""
                                        style={{ width: '45px', height: '45px' }}
                                        className="rounded-circle"
                                    />
                                    <div className="ms-3">
                                        <p className="fw-bold mb-1">{team.name}</p>
                                        <p className="text-muted mb-0">{team.country}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className="fw-normal mb-1">{team.country}</p>
                            </td>
                            <td>{team.registrationDate}</td>
                            <td>{team.cost}</td>
                            <td>
                                <td>
                                    <div className="row">
                                        <div className="col-4">
                                            <button id={team.id} onClick={(e) => handleEdit(e)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                Editar
                                            </button>
                                        </div>
                                        <div className="col-4">
                                            <button className="btn btn-primary" onClick={() => deleteTodo(team.id)}>
                                                Eliminar
                                            </button>
                                        </div>
                                        <div className="col-4">
                                            <button className="btn btn-primary">
                                                Participantes
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Editar</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="row">
                                    <form className="form-floating">
                                        <input onChange={(e) => handleChange(e, "name")} type="text" className="form-control" id="eventName" placeholder="nombre" value={selectedEvent.name} />
                                        <label for="eventName">Nombre:</label>
                                    </form>

                                </div>
                                <div className="row">

                                    <form className="form-floating">
                                        <input onChange={(e) => handleChange(e, "shortDescription")} type="text" className="form-control" id="eventDescription" placeholder="nombre" value={selectedEvent.shortDescription} />
                                        <label for="eventDescription">Descripcion corta:</label>
                                    </form>

                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input type="text" className="form-control" id="eventDate" placeholder="Fecha de inicio" value={selectedEvent.startDate} />
                                        <label for="eventDate">Fecha de inicio:</label>
                                    </form>
                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input type="text" className="form-control" id="eventDate" placeholder="fecha final" value={selectedEvent.endtDate} />
                                        <label for="eventDate">Fecha de final:</label>
                                    </form>
                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input type="text" className="form-control" id="eventLocation" placeholder="Location" value={selectedEvent.location} />
                                        <label for="eventName">Location:</label>
                                    </form>

                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input type="text" className="form-control" id="eventLogo" placeholder="Logo" value={selectedEvent.logo} />
                                        <label for="eventName">Logo:</label>
                                    </form>

                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input type="text" className="form-control" id="eventDecriptionLong" placeholder="Descripcion larga" value={selectedEvent.longDescription} />
                                        <label for="eventDescriptionLong">Descripcion larga:</label>
                                    </form>

                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input type="text" className="form-control" id="eventRule" placeholder="Reglas" value={selectedEvent.rules} />
                                        <label for="eventRule">Reglas:</label>
                                    </form>

                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input type="text" className="form-control" id="eventLimiteDate" placeholder="Fecha limite" value={selectedEvent.endDateDate} />
                                        <label for="eventLimiteDate">Fecha limite:</label>
                                    </form>

                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input type="text" className="form-control" id="eventStatusRegister" placeholder="Status del registro" value={selectedEvent.registrationStatus} />
                                        <label for="eventStatusRegister">Status del registro:</label>
                                    </form>

                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input type="text" className="form-control" id="eventContactData" placeholder="Datos de contacto" value={selectedEvent.name} />
                                        <label for="eventContacData">Datos de contacto:</label>
                                    </form>

                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input type="text" className="form-control" id="eventCost" placeholder="Costo de inscripcion" value={selectedEvent.name} />
                                        <label for="eventCost">Costo de inscripcion:</label>
                                    </form>

                                </div>

                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Cambiar</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default RegistrarOrganizadores;


