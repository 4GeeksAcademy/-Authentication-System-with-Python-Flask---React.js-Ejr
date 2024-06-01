import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../../store/appContext.js";

export const GetModuleUser = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    // Verificar si store.course y store.course.access_to_course existen
    const accessToModules = store.modules?.Module;

    return (
        <div className='container-fluid'>
            {
                accessToModules && accessToModules.length === 0
                    ? "Sin Course Comprado"
                    : accessToModules?.map((item, index) => {
                        return (
                            <div className="accordion " id="accordionExample" key={index}>
                                {/**Accordion  */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                                            <span>Access to <strong>{item.title}</strong>/ {item.categoyTitle}</span>
                                        </button>
                                    </h2>
                                    <div id={`collapse${index}`} className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
            }
        </div >
    )
}
