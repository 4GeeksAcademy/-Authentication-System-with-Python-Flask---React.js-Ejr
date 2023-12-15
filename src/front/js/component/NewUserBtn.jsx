import React from 'react'
import { Link } from "react-router-dom";

const NewUserBtn = () => {
    return (
        <div>
            <Link to={'/signup'}>
                <button type="button" className="btn btn-outline-primary">Registra una nueva cuenta</button>
            </Link>

        </div>
    )
}

export default NewUserBtn