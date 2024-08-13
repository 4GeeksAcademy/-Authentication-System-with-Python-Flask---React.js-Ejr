import React, { useContext } from 'react';
import { Context } from '../store/appContext';

// Acá habría que pasar el usuario x el store y despues mostrarle la imagen, si es que le vamos a poner
const ProfileIcon = () => {
    const { store, actions } = useContext(Context);

    return (
        store.currentUser.user.sex === 'male'
            ? <img className='size-40 rounded-full' src={`https://avatar.iran.liara.run/public/boy?username=${store.currentUser.user.name}`} /> 
            : <img className='size-40 rounded-full' src={`https://avatar.iran.liara.run/public/girl?username=${store.currentUser.user.name}`} />
    )
}

export default ProfileIcon;
