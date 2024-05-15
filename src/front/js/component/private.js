import React, { useState } from 'react';

const Private = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {actions} = useContext(Context);  

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.Private();
        
    };

    return (
        <h1>VISTA PRIVADA, HAS INICIADO SESIÓN</h1>
    );
};

export default Private;
