import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../store/appContext'


export const TeacherStudents = () => {
    const { store, actions } = useContext(Context)
    
    return (
        <div className=" containerd-flex  justify-content-center align-items-center p-4">

            {(store.user.access_to_teacher == '') ? "No hay Students Registrados" : store.user.access_to_user.map((item, index) => {
                return (
                    <div key={index}>
                        {
                            (store.spinner)
                                ? <div clasName="d-flex justify-content-center">
                                    <div>
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="text-center">Loading...</p></div>
                                </div>

                                : <div className='border border-primary rounded mx-5 my-2 py-3 px-3 text-center'>
                                    <table className="table mx-auto ">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Last Name</th>
                                                <th scope="col">Correo</th>
                                                <th scope="col">Number Document</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">Username</th>
                                                <th scope="col">Gender</th>
                                                <th scope="col">EDIT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.name}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.email}</td>
                                                <td>{item.numberDocument}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.username}</td>
                                                <td>{item.gender}</td>
                                                <td>{"Edit"}  {"Del"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                        }
                    </div>
                )})
            }
        </div>
    )
}
