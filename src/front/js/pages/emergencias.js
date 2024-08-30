import React from "react";

const Emergencias = () => {
    return(
        <div className="container mt-5 col-12 col-md-8" style={{ minHeight: '70vh' }}>
            <h2 className="text-start text-inicio mb-4">Teléfonos de Emergencias</h2>
            <div className="d-flex flex-column">
                <div className="card card-emergencia text-dark mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center"><h6 className="m-0">ASSE - Salud Mental</h6><h5 className="mb-0 me-4 text-inicio">0800 19 20</h5></div>
                    <div className="card-body">
                        <p className="card-text">El número está habilitado las 24 horas y es para toda la población. La Administración de Servicios de Salud del Estado ASSE habilitó la línea para la atención psicológica gratuita a personas que necesiten algún tipo de apoyo emocional en el marco de la crisis provocada por el coronavirus.</p>
                    </div>
                </div>
                <div className="card card-emergencia text-dark mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center"><h6 className="m-0 ">ASSE - Línea Vida</h6><h5 className="mb-0 me-4 text-inicio">0800 07 67</h5></div>
                    <div className="card-body">
                        <p className="card-text">Atención telefónica de carácter nacional, con el objetivo de contribuir a disminuir los intentos de autoeliminación o los suicidios a nivel país.</p>
                    </div>
                </div>
                <div className="card card-emergencia text-dark mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center"><h6 className="m-0">MIDES - Apoyo a la mujer</h6><h5 className="mb-0 me-4 text-inicio">0800  41 41</h5></div>
                    <div className="card-body">
                        <p className="card-text">Es gratuito, confidencial, de alcance nacional y funciona los 365 días del año. Pueden acceder todas las mujeres, mayores de 18 años, en situación de violencia doméstica de todo el país, urbano y rural. El servicio ofrece una escucha activa, asesoramiento y orientación responsable desde una perspectiva de género y derechos humanos.</p>
                    </div>
                </div>
                <div className="card card-emergencia text-dark mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center"><h6 className="m-0">ASSE - Programa de Niñez y Adolescencia</h6><h5 className="mb-0 me-4 text-inicio">2486 26 61</h5></div>
                    <div className="card-body">
                        <p className="card-text">El objetivo general es promover la salud integral del niño/a, el/la adolescente y su familia a través de acciones integradas y coordinadas de promoción, protección, recuperación y rehabilitación, sustentada en los principios de la Atención Primaria en Salud APS en el primer nivel de atención.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Emergencias