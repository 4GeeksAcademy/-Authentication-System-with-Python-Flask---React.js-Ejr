import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import bebe2 from '../../img/bebe2.jpg'; // Imagen predeterminada en caso de que no haya una foto del bebé

export const Add_baby = () => {
    const { actions } = useContext(Context);
    const [babyData, setBabyData] = useState({
        name: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
        photoUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBabyData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await actions.createBaby(babyData);
            if (success) {
                alert('Baby added successfully!');
                setBabyData({
                    name: '',
                    gender: '',
                    age: '',
                    height: '',
                    weight: '',
                    photoUrl: ''
                });
            } else {
                alert('Failed to add baby');
            }
        } catch (error) {
            console.error("Error adding baby:", error);
        }
    };

    return (
        <div className="container" style={{ width: '80vw', height: '80vw', backgroundColor: '#FBEE84', marginTop: '55px' }}>
            <div className="row">
                <div className="col-md-6">
                    <div className="d-flex flex-column justify-content-center" style={{ borderRadius: '10px', padding: '10px', border: '2px solid #63DDFC' }}>
                        <h2>Add New Baby</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Baby name"
                                    value={babyData.name}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{ borderRadius: '10px', border: '2px solid #63DDFC' }}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>Gender</label>
                                <input
                                    type="text"
                                    name="gender"
                                    placeholder="Gender"
                                    value={babyData.gender}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{ borderRadius: '10px', border: '2px solid #63DDFC' }}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>Age (months)</label>
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Age"
                                    value={babyData.age}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{ borderRadius: '10px', border: '2px solid #63DDFC' }}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>Height (cm)</label>
                                <input
                                    type="number"
                                    name="height"
                                    placeholder="Height"
                                    value={babyData.height}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{ borderRadius: '10px', border: '2px solid #63DDFC' }}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>Weight (kg)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    placeholder="Weight"
                                    value={babyData.weight}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{ borderRadius: '10px', border: '2px solid #63DDFC' }}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>Photo URL</label>
                                <input
                                    type="text"
                                    name="photoUrl"
                                    placeholder="Photo URL"
                                    value={babyData.photoUrl}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{ borderRadius: '10px', border: '2px solid #63DDFC' }}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ borderRadius: '10px' }}>Add Baby</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img src={babyData.photoUrl || bebe2} className="img-fluid" alt="IMG_Baby" style={{ width: '300px', height: 'auto', objectFit: 'cover', borderRadius: '50%' }} />
                </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
                <Link to="/gestor_bebes">
                    <button type="button" className="btn btn-dark" style={{ borderRadius: '10px' }}>Back to Baby Manager</button>
                </Link>
            </div>
        </div>
    );
};
