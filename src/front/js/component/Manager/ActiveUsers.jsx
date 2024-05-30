import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../store/appContext'

import { AddNewUser } from './AddNewUser.jsx'
import { UpdateUser } from './UpdateUser.jsx'


export const ActiveUsers = () => {
    const { store, actions } = useContext(Context)

    const navigate = useNavigate()

    const handleUpdateUser = (userId) => {
        navigate(`/UpdateUser/${userId}`)

    }

    function deleteUser(userId) {
		actions.deleteUser(userId)
	}

    console.log(store.user.access_to_user)
    return (
        <div className=" containerd-flex  justify-content-center align-items-center p-4">

            {(store.spinner)
            ? <div className="d-flex justify-content-center">
                <div>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-center">Loading...</p></div>
            </div>

            : <div className='border border-primary rounded mx-5 my-2 py-3 px-3 text-center'>
                <div>
                    {(store.user.access_to_user == '') ? "No hay Students Registrados" : store.user.access_to_user.map((item, index) => {
                        return (
                            <div key={index}>
                                {
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
                                                <th scope="col">Age</th>
                                                <th scope="col">EDIT</th>
                                            </tr>
                                        </thead>
                                        
                                    </table>
                                }
                            </div>
                        )
                    })
                    }

                </div>
            </div>}



            <div>
                <AddNewUser />
            </div>
        </div>
    )
}
