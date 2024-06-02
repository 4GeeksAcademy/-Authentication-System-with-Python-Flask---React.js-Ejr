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
    console.log(store.course.access_to_courses)
    return (
        <>
          <Navbar />
          <div className="card mb-3" style={{ minWidth: '540px' }}>
            <div className="row g-0">
              <div className="col-md-4">
              <img
                  src={course.titleUrlMedia}
                  className="img-fluid rounded-start"
                  alt="Course thumbnail"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <p className="card-text"><small className="text-body-secondary">Number of assesments: {course.assessment}</small></p>
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
    );
}
// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Context } from '../../store/appContext.js';
// import { Navbar } from '../../component/Navbar.jsx';

// export const Course = () => {
//     const { id } = useParams();
//     const { store, actions } = useContext(Context);
//     const [course, setCourse] = useState(null);
//     const [media, setMedia] = useState(null);

//     useEffect(() => {
//         console.log("Store updated:", store);

//         // Verificar si store.course existe y contiene datos
//         if (store.course && store.course.access_to_courses) {
//             const foundCourse = store.course.access_to_courses.find(course => course.id === parseInt(id));
//             console.log("Found course:", foundCourse);
//             setCourse(foundCourse);
//         } else {
//             console.warn("store.course or store.course.access_to_courses is undefined or empty");
//         }

//         // Verificar si store.media existe y contiene datos
//         if (store.media && store.media.access_to_media) {
//             const foundMedia = store.media.access_to_media.find(media => media.id === parseInt(id));
//             console.log("Found media:", foundMedia);
//             setMedia(foundMedia);
//         } else {
//             console.warn("store.media or store.media.access_to_media is undefined or empty");
//         }
//     }, [store, id]);

//     console.log("Course state:", course);
//     console.log("Media state:", media);

//     return (
//         <>
//           <div className="card mb-3" style={{ minWidth: '540px' }}>
//             <div className="row g-0">
//               <div className="col-md-4">
//                 {course && (
//                   <img
//                     src={course.titleUrlMedia}
//                     className="img-fluid rounded-start"
//                     alt="Course thumbnail"
//                     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                   />
//                 )}
//               </div>
//               <div className="col-md-8">
//                 <div className="card-body">
//                   <h5 className="card-title">{course ? course.title : "Loading..."}</h5>
//                   <p className="card-text">{course ? course.description : "Loading..."}</p>
//                   <p className="card-text"><small className="text-body-secondary">Number of assessments: {course ? course.assessment : "Loading..."}</small></p>
//                   <div className="card-text"><small className="text-body-secondary">You will get: {course ? course.titleCertificateToGet : "Loading..."}</small></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="container">
//             <div className="row">
//               <div className="col border-end border-warning border-4">{course ? course.titleTeacher : "Loading..."}</div>
//               <div className="col border-end border-warning border-4">{course ? course.createDate : "Loading..."}</div>
//               <div className="col border-end border-warning border-4">{course ? course.dateExpiration : "Loading..."}</div>
//             </div>
//           </div>
//         </>
//     );
// };

