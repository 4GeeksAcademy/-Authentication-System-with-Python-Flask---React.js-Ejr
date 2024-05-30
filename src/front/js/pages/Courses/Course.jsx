import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../../store/appContext'
import { Navbar } from '../../component/Navbar.jsx'

const Course = () => {
  const { id } = useParams();
  const { store } = useContext(Context);
  const [course, setCourse] = useState(null);
  const [media, setMedia] = useState(null);

  useEffect(() => {
    if (store.course && store.course.access_to_courses) {
      const foundCourse = store.course.access_to_courses.find(course => course.id === parseInt(id))
      setCourse(foundCourse)
    }
  }, [store.course, id]);
  console.log(course)

  useEffect(() => {
    if (store.media && store.media.access_to_media) {
      const foundMedia = store.media.access_to_media.find(media => media.id === parseInt(id))
      setMedia(foundMedia)
    }
  }, [store.media, id])

  console.log(store.media)
  return (
    <>
      <Navbar />
      {course ? (
        <>
          <div className="card mb-3" style={{ minWidth: '540px' }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={store.media} className="img-fluid rounded-start" alt="Course thumbnail" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <p className="card-text"><small className="text-body-secondary">{course.assessment}</small></p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col border-end border-warning border-4">{course.titleTeacher}</div>
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

export default Course
