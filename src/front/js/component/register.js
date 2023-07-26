import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';

export const Register = () => (
    
const [register, setRegister] = useState( null )
    return(<div className="register">
        <div className="register-body">
            <span className="input-group-text">E-Mail Address</span>
			    <input type="text" aria-label="E-Mail Address" className="form-control"></input>
			<span className="input-group-text">Password</span>
			    <input type="text" aria-label="E-Mail Address" className="form-control"></input>
 			<span className="input-group-text">Recovery Question</span>
  				<input type="text" aria-label="Last name" className="form-control"></input>
				  <span className="input-group-text">Recovery Answer</span>
			    <input type="text" aria-label="E-Mail Address" className="form-control"></input>
		</div>
        </div>
    )