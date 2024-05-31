import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../../store/appContext.js'
import { Navbar } from '../../component/Navbar.jsx'

export const Course = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [course, setCourse] = useState(null);
    const [media, setMedia] = useState(null);

    useEffect(() => {
        console.log("Store updated:", store);
        const foundCourse = store.course.access_to_courses.find(course => course.id === id);
        
            
            console.log("Found course:", foundCourse);
            setCourse(foundCourse);
        
    }, [store, id, actions]);

    useEffect(() => {
        if (store.media && store.media.access_to_media) {
            const foundMedia = store.media.access_to_media.find(media => media.id === parseInt(id));
            console.log("Found media:", foundMedia);
            setMedia(foundMedia);
        }
    }, [store.media, id]);

    console.log("Course state:", course);
    console.log("Media state:", media);

    return (
        <>
            <Navbar />
            {course ? (
                <>
                    <div className="card mb-3" style={{ minWidth: '540px' }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={media ? media.url : ''} className="img-fluid rounded-start" alt="Course thumbnail" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{course.title}</h5>
                                    <p className="card-text">{course.description}</p>
                                    <p className="card-text"><small className="text-body-secondary">Number of assessments: {course.assessment}</small></p>
                                    <div className="card-text"><small className="text-body-secondary">You will get: {course.titleCertificateToGet}</small></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col border-end border-warning border-4">{course.titleTeacher}</div>
                            <div className="col border-end border-warning border-4">{course.createDate}</div>
                            <div className="col border-end border-warning border-4">{course.dateExpiration}</div>
                        </div>
                    </div>
                </>
            ) : (
                <div>No course data</div>
            )}
        </>
    );
}
