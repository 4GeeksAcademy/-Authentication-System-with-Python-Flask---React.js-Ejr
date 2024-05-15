import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

export const Navbar = () => {

    const navigate = useNavigate()
    function handleUserView() {
        navigate('/UserView')
    }

    const navigateManagerView = useNavigate()
    function handleManagerView(){
        navigateManagerView('/ManagerView')
    }
    const navigateTeacherView = useNavigate()
    function handleTeacherView(){
        navigateTeacherView('/TeacherView')
    }
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand">Atlas learning</a>
                    <p>More about us</p>
                    <button onClick={handleUserView}>UserView</button>
                    <button onClick={handleManagerView}>ManagerView</button>
                    <button onClick={handleTeacherView}>TeacherView</button>
                    <div className="d-flex">
                        <Link to='/FormUser'>
                            <button className='btn btn-outline-success m-1' type='submit'>signup</button>
                        </Link>
                        <Link to='/logIn'>
                            <button className="btn btn-outline-success m-1" type="submit">login</button>
                        </Link>

                        <Link to='/TeacherView'>
                            <button className="btn btn-outline-success m-1" type="submit"> Private User</button>
                        </Link>

                        <button className='btn btn-outline-success m-1' type='submit'><i className="fa-solid fa-cart-shopping fa-fade" style={{ color: "#13ec49;" }}></i></button>
                    </div>
                </div>
            </nav>
        </div>
    )
}
