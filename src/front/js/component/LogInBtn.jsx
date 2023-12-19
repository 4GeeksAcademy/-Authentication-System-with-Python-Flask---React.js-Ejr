import React from 'react'
import { Link } from 'react-router-dom'

const LogInBtn = () => {
  return (
    <div>
         <Link to={'/login'}>
                <button type="button" className="btn btn-outline-primary">Ingresa con tu cuenta</button>
            </Link>

    </div>
  )
}

export default LogInBtn