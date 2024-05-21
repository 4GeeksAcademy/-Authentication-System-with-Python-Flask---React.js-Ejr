import React from 'react'
import {useNavigate} from 'react-router-dom';

const CourseCard = ({id, img, title, description}) => {
    const navigate = useNavigate()


    return (
        <div className="card mx-2 shadow" style={{ width: "18rem", height: "auto", paddingTop: "20px", paddingBottom: "20px" }}>
            <div className="card-img-top">
                <div className="course-thumbnail">
                    <img
                        src={img}
                        className="img-fluid"
                        alt="python-course"
                        style={{ objectFit: 'cover', width: '100%', height: '180px' }}
                    />
                </div>
            </div>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-primary" onClick={()=>navigate('/course/'+ id)}>
                        View Course
                    </button>
                    <button type="button" className="btn btn-success">
                        Buy Course
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CourseCard