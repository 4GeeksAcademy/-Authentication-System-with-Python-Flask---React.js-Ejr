import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../store/appContext'


export const TeacherStudents = () => {
    const { store, actions } = useContext(Context)
    return (
        <div className=" containerd-flex  justify-content-center p-4">
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
            {store.user.map((item, index) => {
                return (
                    <div key={index} className='border border-primary rounded mx-5 my-2 py-3 px-3'>
                        <p><span className='text-primary'>Id:</span>{item.id} y <span className='text-primary'>Correo:</span>{item.email}</p>
                    </div>
                )
            })}
        </div>
    )
}



