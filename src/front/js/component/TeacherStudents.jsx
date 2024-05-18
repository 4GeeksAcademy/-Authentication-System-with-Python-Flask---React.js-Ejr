import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../store/appContext'


export const TeacherStudents = () => {
    const { store, actions } = useContext(Context)

    console.log(store.user.Access_to_User)
    return (
        <div className=" containerd-flex  justify-content-center align-items-center p-4">
            {/* <table className="table mx-auto ">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table> */}
            {store.user.Access_to_User.map((item, index) => {
                return (
                    <div key={index}>
                        {
                            (store.spinner)
                                ? <div className="d-flex justify-content-center">
                                    <div>
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="text-center">Loading...</p></div>
                                </div>
                                
                                : <div className='border border-primary rounded mx-5 my-2 py-3 px-3'>
                                    <p>
                                        <span className='text-primary'>Id: </span>{item.id}
                                    </p>
                                    <p>
                                        <span className='text-primary'>Name: </span>{item.Name}
                                    </p>
                                    <p>
                                        <span className='text-primary'>Last Name: </span>{item.lastName}</p>
                                    <p>
                                        <span className='text-primary'>Correo: </span>{item.email}
                                    </p>
                                    <p>
                                        <span className='text-primary'>Number Document: </span>{item.numberDocument}
                                    </p>
                                    <p>
                                        <span className='text-primary'>Phone: </span>{item.phone}
                                    </p>
                                    <p>
                                        <span className='text-primary'>Username: </span>{item.username}
                                    </p>
                                    <p> <span className='text-primary'>Gender: </span>{item.gender}
                                    </p>
                                </div>
                        }
                    </div>

                )
            })}

        </div>
    )
}



