import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../../store/appContext.js";

export const GetModule = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleUpdateModules = (moduleId) => {
        navigate(`/modulesUpdate/${moduleId}`);
    };



    if (!store.modules.Modules || store.modules.Modules.length === 0) {
        return <div>No hay Modules disponibles</div>;
    }

    return (
        <div className="d-flex overflow-auto justify-content-center p-4 flex-wrap">
            <table className="table mx-auto">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description Content</th>
                        <th scope="col">Video ID</th>
                        <th scope="col">Image ID</th>
                        <th scope="col">date</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {store.modules.Modules.map((item, index) => (
                        <tr key={item.id || index}>
                            <th scope="row">{item.id}</th>
                            <td>{item.tile}</td>
                            <td>{item.descriptionContent}</td>
                            <td>{item.urlVideo}</td>
                            <td>{item.videoId}</td>
                            <td>{item.imageId}</td>
                            <td>{item.dateCreate}</td>
                            <td>
                                <button onClick={() => handleUpdateModules(item.id)}>Edit</button>
                                <button onClick={() => actions.deleteModules(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex overflow-auto justify-content-center p-4 flex-wrap">
                {store.modules && store.modules.Modules ? (
                    store.modules.Modules.length === 0 ? "No hay Modules" :
                        store.modules.Modules.map((item, index) => (
                            <div key={index}>
                                <strong><p>{item.title}</p></strong>
                                <video controls className="img-fluid" style={{ width: '30%', height: '30%' }}>
                                    <source src={item.urlVideo} type="video/mp4" />
                                </video>
                            </div>
                        ))
                ) : (
                    "Loading modules..."
                )}
            </div>
        </div>
    );
};

