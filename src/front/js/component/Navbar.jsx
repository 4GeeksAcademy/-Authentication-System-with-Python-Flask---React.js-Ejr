import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand">Atlas learning</a>
                    <p>More about us</p>
                    <form className="d-flex">
                        <Link to='/FormUser'>
                            <button className='btn btn-outline-success m-1' type='submit'>signup</button>
                        </Link>
                            <button className="btn btn-outline-success m-1" type="submit">login</button>
                            <button className='btn btn-outline-success m-1' type='submit'><i className="fa-solid fa-cart-shopping fa-fade" style={{color: "#13ec49;"}}></i></button>
                    </form>
                </div>
            </nav>
        </div>
    )
}
