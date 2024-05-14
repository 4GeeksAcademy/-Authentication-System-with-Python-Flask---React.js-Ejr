import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';

export const AddUser = () => {
    const { action } = useContext(Context);

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        name: '',
        lastName: '',
        username: '',
        numberDocument: '',
        phone: '',
        age: '',
        gender: '',
    });

    const [selectedRole, setSelectedRole] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'isUser') {
            setSelectedRole(value);
        } else {
            setUserData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (
            userData.email !== '' &&
            userData.password !== '' &&
            userData.name !== '' &&
            userData.lastName !== '' &&
            userData.username !== '' &&
            userData.numberDocument !== '' &&
            userData.phone !== '' &&
            userData.age !== '' &&
            selectedRole
        ) {
            const newUser = {
                ...userData
            };
            const userRole = {
                role: selectedRole
            };
            console.log('New User:', newUser);
            console.log('Selected Role:', userRole);
            action.createUser(newUser, userRole); // Aquí corregimos de actions.createUser a action.createUser
        } else {
            alert('You must complete all fields');
        }
    };
    
    console.log(userData);

    return (
        <form className="container mx-auto mt-5 row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
            <div className="text-center">
                <h4>Personal information</h4>
            </div>
            <div className="col-md-4">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" aria-describedby="inputGroupPrepend" name='name' onChange={handleChange} value={userData.name} required />
                <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-4">
                <label className="form-label">Last name</label>
                <input type="text" className="form-control" aria-describedby="inputGroupPrepend" name='lastName' onChange={handleChange} value={userData.lastName} required />
                <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-2">
                <label className="form-label">Username</label>
                <div className="input-group has-validation">
                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="text" className="form-control" aria-describedby="inputGroupPrepend" name='username' onChange={handleChange} value={userData.username} required />
                    <div className="invalid-feedback">Please choose a username.</div>
                </div>
            </div>
            <div className="col-md-2">
                <label className="form-label">Role</label>
                <div className="input-group has-validation">
                    <select className="form-select" name='isUser' onChange={handleChange} value={selectedRole} required>
                        <option selected disabled value="Choose">Choose</option>
                        <option>Teacher</option>
                        <option>Student</option>
                        <option>Manager</option>
                    </select>
                </div>
            </div>
            <div className="col-md-3 position-relative">
                <label className="form-label">Number Document</label>
                <input type="text" className="form-control" id="validationTooltip03" name='numberDocument' onChange={handleChange} value={userData.numberDocument} required />
                <div className="invalid-tooltip">Please provide a valid number document.</div>
            </div>
            <div className="col-md-3 position-relative">
                <label className="form-label">Gender</label>
                <select className="form-select" name='gender' onChange={handleChange} value={userData.gender} required>
                    <option selected disabled value="Choose">Choose</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </select>
                <div className="invalid-tooltip">Please select a Gender</div>
            </div>
            <div className="col-md-3 position-relative">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" name='phone' onChange={handleChange} value={userData.phone} required />
                <div className="invalid-tooltip">Please provide a valid Phone.</div>
            </div>
            <div className="col-md-3 position-relative">
                <label className="form-label">Age</label>
                <input type="number" className="form-control" name='age' onChange={handleChange} value={userData.age} required />
                <div className="invalid-tooltip">Please provide a valid Age.</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' onChange={handleChange} value={userData.email} />
                <div className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" name='password' onChange={handleChange} value={userData.password} />
            </div>
            <button type="submit" className="btn btn-primary">Create User</button>
        </form>
    );
};

