import React, { useContext } from 'react';
import { Context } from '../../store/appContext';

export const UserProfile = () => {
    const { store } = useContext(Context);

    return (
        <div className="container d-flex justify-content-center align-items-center p-4">
            {store.user.access_to_user.length > 0 ? (
                <div className='border border-primary rounded mx-5 my-2 py-3 px-3 text-center'>
                    <table className="table mx-auto ">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
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
                            {store.user.access_to_user.map((item, index) => (
                                <tr key={index}>
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
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
};
