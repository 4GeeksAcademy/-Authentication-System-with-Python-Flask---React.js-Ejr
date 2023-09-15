import React from "react";
import '../../styles/accountpage.css'
import "../../styles/registrarOrganizadores.css";
const RegistrarOrganizadores = () => {

    console.log("alfsdjasld")

    const teamsData = [
        {
            id: 1,
            name: 'JAM ON IT',
            country: 'Colombia',
            registrationDate: '13/11/2023',
            endDay: '16/11/2023',
        },
        {
            id: 2,
            name: 'The Last Game',
            country: 'Las Vegas',
            registrationDate: '13/11/2024',
            endDay: '16/11/2024',
        },
        {
            id: 3,
            name: 'Costa Rica tournament',
            country: 'Costa Rica',
            registrationDate: '13/11/2025',
            endDay: '16/11/2025',
        },
    ];
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
                                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        Editar
                                    </button>
                                    <button className="btn btn-primary">
                                        Eliminar
                                    </button>
                                    <button className="btn btn-primary">
                                        Participantes
                                    </button>
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
                            <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="row">
                                    <div className="col"> <b>Nombre</b> </div>
                                </div>
                                <div className="row">
                                    <div className="col"> Descripción corta</div>
                                </div>
                                <div className="row">
                                    <div className="col"> Fecha de Inicio </div>
                                </div>
                                <div className="row">
                                    <div className="col"> Ubicación</div>
                                </div>
                                <div className="row">
                                    <div className="col"> Logotipo (archivo) </div>
                                </div>
                                <div className="row">
                                    <div className="col"> Descripción larga </div>
                                </div>
                                <div className="row">
                                    <div className="col"> Reglas (archivo) </div>
                                </div>
                                <div className="row">
                                    <div className="col"> Fecha límite de registro</div>
                                </div>
                                <div className="row">
                                    <div className="col"> Status del registro</div>
                                </div>
                                <div className="row">
                                    <div className="col"> Datos de contacto  </div>
                                </div>
                                <div className="row">
                                    <div className="col"> Costo de inscripción </div>
                                </div>
                                <div className="col"> </div>
                            </div>
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Understood</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default RegistrarOrganizadores