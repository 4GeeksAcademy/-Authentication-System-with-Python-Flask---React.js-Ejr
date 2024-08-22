import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import bebe1 from "../../img/bebe1.jpg"; // Imagen predeterminada en caso de que no haya una foto del bebé

export const Gestor_bebes = () => {
    const { actions, store } = useContext(Context);
    const [loading, setLoading] = useState(true);

    const { babies } = store;

    useEffect(() => {
        const fetchBabies = async () => {
            try {
                await actions.getBabiesByUserId(); // Cargar bebés del usuario
                setLoading(false);
            } catch (error) {
                console.error("Error fetching babies in useEffect:", error);
                setLoading(false);
            }
        };
        fetchBabies();
    }, [actions]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{backgroundColor:'#FBEE84'}}>
            <div className="container" style={{ width: '80vw', height: '80vw', backgroundColor: 'white', marginTop: '55px' }}>
                <div className="d-flex flex-column justify-content-center">
                    <div className="d-flex flex-column justify-content-center mt-3">
                        <label className="tituloApp" style={{ fontSize: '24px', fontWeight: 'bold' }}>Babies</label>
                        {/* Mostrar los bebés con foto, nombre y enlace para editar */}
                        {babies.length > 0 ? (
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {babies.map((baby) => (
                                    <li key={baby.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', borderRadius: '10px', padding: '10px', border: '2px solid #FBEE84' }}>
                                        <img
                                            src={baby.photoUrl || bebe1}
                                            alt={baby.name}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%', marginRight: '15px' }}
                                        />
                                        <span style={{ flex: 1 }}>{baby.name}</span>
                                        <Link
                                            to={`/gestor_bebe/${baby.id}`}
                                            style={{ color: '#075E81', textDecoration: 'underline', marginLeft: '10px' }}
                                        >
                                            Edit Baby
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div>No babies found</div>
                        )}
                    </div>
                    {/* Botón para añadir un bebé */}
                    <div className="mb-3">
                            <Link
                                to="/add_baby"  
                                className="btn btn-primary"
                                style={{ backgroundColor: '#075E81', borderColor: '#075E81' }}
                            >
                                Add New Baby
                            </Link>
                        </div>
                </div>
            </div>
        </div>
    );
};
