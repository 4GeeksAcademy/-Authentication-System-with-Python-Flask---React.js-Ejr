import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

export const AddUser = () => {
    const{store, action} = useContext(Context)
    const[createUser, setCreateUser] = useState(
        {
            email: '',
            password: '',
            isUser: null,
            name: '',
            lastName: '',
            username: '',
            numberDocument: '',
            phone: '',
            age: '',
            gender: '',
        })
        const handleChange = (event) => {
            const { name, value } = event.target;
            setCreateUser(prevState => ({
                ...prevState,
                [name]: value
            }));
        };
        
        const handleSubmit = (event) =>{
            event.preventDefault()
            if(
                createUser.email !== '' &&
                createUser.password !== '' &&
                createUser.name !== '' &&
                createUser.lastName !== '' &&
                createUser.username !== '' &&
                createUser.numberDocument !== '' &&
                createUser.phone !== '' &&
                createUser.age !== ''
            )
                {
                    /*action.createUser(createUser)*/
                } else {
                    alert('You must complete this field')
                }
        
        }

        console.log(createUser)

    return (

        <form  className=" container mx-auto mt-5 row g-3 needs-validation" onSubmit={handleSubmit} novalidate>

            <div className="text-center">
                <h4>Personal information</h4>
            </div>

            <div className="col-md-4">
                <label className="form-label">Name</label>
                <input type="text" className="form-control"  aria-describedby="inputGroupPrepend" name='name' onChange={handleChange} value={createUser.name} required />
                <div className="valid-feedback">
                    Looks good!
                </div>
            </div>

            <div className="col-md-4">
                <label className="form-label">Last name</label>
                <input type="text" className="form-control" aria-describedby="inputGroupPrepend" name='lastName' onChange={handleChange} value={createUser.lastName} required />
                <div className="valid-feedback">
                    Looks good!
                </div>
            </div>

            <div className="col-md-2">
                <label  className="form-label">Username</label>
                <div className="input-group has-validation">
                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="text" className="form-control" aria-describedby="inputGroupPrepend" name='username' onChange={handleChange} value={createUser.username} required />
                    <div className="invalid-feedback">
                        Please choose a username.
                    </div>
                </div>
            </div>

            <div className="col-md-2">
                <label  className="form-label">Role</label>
                <div className="input-group has-validation"  >
                    <select className="form-select"  name='isUser' onChange={handleChange} value={createUser.isUser} required>
                    <option selected disabled value="Choose">Choose</option>
                    <option value={false}>Teacher</option>
                    <option value={true} >Student</option>
                </select>
                
                </div>
            </div>

            <div className="col-md-3 position-relative">
                <label  className="form-label">Number Document</label>
                <input type="text" className="form-control" id="validationTooltip03" name='numberDocument' onChange={handleChange} value={createUser.numberDocument} required />
                <div className="invalid-tooltip">
                    Please provide a valid number document.
                </div>
            </div>
            <div className="col-md-3 position-relative">
                <label  className="form-label">Gender</label>
                <select className="form-select" name='gender' onChange={handleChange} value={createUser.gender} required>
                    <option selected disabled value="Choose">Choose</option>
                    <option option value="Female">Female</option>
                    <option option value="Male">Male</option>
                </select>

                <div className="invalid-tooltip">
                    Please select a Gender
                </div>
            </div>

            <div className="col-md-3 position-relative">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" name='phone' onChange={handleChange} value={createUser.phone} required />
                <div className="invalid-tooltip">
                    Please provide a valid Phone.
                </div>
            </div>

            <div className="col-md-3 position-relative">
                <label className="form-label">Age</label>
                <input type="number" className="form-control" name='age' onChange={handleChange} value={createUser.age} required />
                <div className="invalid-tooltip">
                    Please provide a valid Age.
                </div>
            </div>

            <div className="mb-3">
                <label  className="form-label">Email address</label>
                <input type="email" className="form-control"  name='email' onChange={handleChange} value={createUser.email}/>
                <div className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control"  name='password' onChange={handleChange} value={createUser.password}/>
            </div>


            <button type="submit" className="btn btn-primary" >Create User</button>
        </form>



    )
}
