import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../store/appContext";
import RentButton from "../component/RentButton"
import FindCanchaButton from "../component/FindCanchaButton"
import UploadWidget from '../component/UploadWidget';
import "../../styles/profile.css"


export const Profile = () => {
    const [profilePicture, setProfilePicture] = useState('https://i1.sndcdn.com/avatars-000733526755-v9y8eh-t500x500.jpg');
    const [userData, setUserData] = useState(null); // Added state for user data
    const { store, actions } = useContext(Context);

    const handleChangePicture = () => {
        const randomImageURL = 'https://source.unsplash.com/random';
        setProfilePicture(randomImageURL);
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL + "/api/user");
            const data = await response.json();
            console.log(data, "dataaaaaaaaaaaaaaaa")
            setUserData(data[0]); // quitar la seleccion de index cuando existan mas usuarios. 
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    const name = userData ? userData.name : "";
    const lastName = userData ? userData.lastname : "";
    const email = userData ? userData.email : "";

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <div className="container py-5">
                <div className="row">
                    <div className="col">
                        <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item"><a href="#">Canchas disponibles</a></li>
                                <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <img src={profilePicture} alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px' }} />
                                <div> 
                                    <button className='btn'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-camera-fill" viewBox="0 0 16 16" onClick={handleChangePicture}>
                                        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                        <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                                    </svg>

                                </button>
                                    
                                </div>
                                <h5 className="my-3">{lastName} {name}</h5>
                                <p className="text-muted mb-1">Full Stack Prisoner</p>
                                <p className="text-muted mb-4">New york, USA</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <button type="button" className="btn btn-primary">Follow</button>
                                    <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-4 mb-lg-0">
                            <div className="card-body p-0">
                                <ul className="list-group list-group-flush rounded-3">

                                    <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fab fa-whatsapp fa-lg" style={{ color: '#333333' }}></i>
                                        <p className="mb-0">Whatsapp</p>
                                    </a>

                                    <a href="https://twitter.com/home" target="_blank" rel="noopener noreferrer" className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                                        <p className="mb-0">Twitter</p>
                                    </a>
                                    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                                        <p className="mb-0">Instagram</p>
                                    </a>
                                    <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                                        <p className="mb-0">Facebook</p>
                                    </a>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Full Name</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{lastName} {name}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Email</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{email}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Sport Interest</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">Basquetball</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Mobile</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">(569) 77777777</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Address</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">New york, USA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="button-container">
                                <RentButton />
                            </div>
                        </div>

                        <div className="row">
                            <div className="button-container">
                                <FindCanchaButton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );

};

