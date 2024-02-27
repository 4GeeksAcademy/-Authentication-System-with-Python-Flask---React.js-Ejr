import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { EditProfile } from "../component/editProfile";

export const Profile = () => {
    const { actions } = useContext(Context)
    const [userData, setUserData] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false)

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    // Traer datos de usuario al cargar la pagina
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await actions.getUserData();
                if (resp.error) {
                    setError("No se pudo cargar datos de usuario");
                } else {
                    setUserData(resp);
                }
            } catch (error) {
                setError("No se pudo cargar datos de usuario");
            }
        };
        fetchData();
    }, [actions]);


    return (
        <div className="container profile">
            <div className="row">
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                {showModal ? EditProfile : ""}
                <div className="col">
                    <h4>Nombre de usuario</h4>
                    <p>{userData.username}</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h4>Nombre</h4>
                    <p>{userData.name}</p>
                </div>
                <div className="col">
                    <h4>Apellido</h4>
                    <p>{userData.lastname}</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h4>Fecha de nacimiento</h4>
                    <p>{userData.birthdate}</p>
                </div>
                <div className="col">
                    <h4>Número de telefono</h4>
                    <p>{userData.phone}</p>
                </div>
            </div>
            <button onClick={toggleModal}>Editar perfil</button>

        </div>
    );
}