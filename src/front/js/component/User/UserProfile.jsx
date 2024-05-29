import React, { useContext } from 'react';
import { Context } from '../../store/appContext';

export const UserProfile = () => {
    const { store } = useContext(Context);

    const userToLogin = JSON.parse(localStorage.getItem("userToLogin"));
    console.log(userToLogin);

    if(!store.user || !store.user.access_to_user){
        return <p>No user ata available</p>;
    }
    
    const currentUser = store.user.access_to_user.find(user=>user.email == userToLogin.email);
    
    if (!currentUser) {
        return <p>No user data available</p>;
    }

    
    return (
        <div className="container d-flex justify-content-center align-items-center p-4">
            <div className='border border-primary rounded mx-5 my-2 py-3 px-3 text-center'>
                <table className="table mx-auto">
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Number Document</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Username</th>
                            <th scope="col">Gender</th>
                            <th scope="col">EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{currentUser.id}</td>
                            <td>{currentUser.name}</td>
                            <td>{currentUser.last_name}</td>
                            <td>{currentUser.email}</td>
                            <td>{currentUser.numberDocument}</td>
                            <td>{currentUser.phone}</td>
                            <td>{currentUser.username}</td>
                            <td>{currentUser.gender}</td>
                            <td>{"Edit"} {"Del"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
