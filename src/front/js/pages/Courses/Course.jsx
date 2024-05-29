// import React, {useContext, useEffect, useState} from 'react'
// import { useParams } from 'react-router-dom'
// import { Context } from '../../store/appContext'
// import { Navbar } from '../../component/Navbar.jsx'

// const Course = () => {
//     const { id } = useParams();
//     const { store } = useContext(Context);
//     const [course, setCourse] = useState(null);
//     const [media, setMedia] = useState(null);

//     useEffect(()=>{
//       if(store.course && store.course.access_to_courses){
//         const foundCourse = store.course.access_to_courses.find(course => course.id === parseInt(id))
//         setCourse(foundCourse)
//       }
//     }, [store.course, id]);


//     useEffect(()=>{
//       if(store.media && store.media.access_to_media){
//         const foundMedia = store.media.access_to_media.find(media => media.id === parseInt(id))
//         setMedia(foundMedia)
//       }
//     }, [store.media, id])

//     console.log(store.media)
//   return (
//     <div>
//       <Navbar />
//       {course ? (
//         <div>
//           <h1>{course.title}</h1>
//           <img src={store.media} alt="Course Thumbnail" /> 
//           <p>{course.description}</p>
//           <div>{course.assessment}</div>
//           <div>{course.titleTeacher}</div>
//           <div>{course.dateExpiration}</div>
//         </div>
//       ): (
//         <div>No course Data</div>
//       )}
//     </div>
//   )
// }

// export default Course

import React, {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../../store/appContext'
import { Navbar } from '../../component/Navbar.jsx'

const Course = () => {
    const { id } = useParams();
    const { store } = useContext(Context);
    const [course, setCourse] = useState(null);
    const [media, setMedia] = useState(null);

    useEffect(()=>{
      if(store.course && store.course.access_to_courses){
        const foundCourse = store.course.access_to_courses.find(course => course.id === parseInt(id))
        setCourse(foundCourse)
      }
    }, [store.course, id]);
    console.log(course)

    useEffect(()=>{
      if(store.media && store.media.access_to_media){
        const foundMedia = store.media.access_to_media.find(media => media.id === parseInt(id))
        setMedia(foundMedia)
      }
    }, [store.media, id])

    console.log(store.media)
  return (
    <div>
      <Navbar />
      {course ? (
        <div>
          <h1>{course.title}</h1>
          <img src={store.media} alt="Course Thumbnail" />
          <p>{course.description}</p>
          <div>{course.assessment}</div>
          <div>{course.titleTeacher}</div>
          <div>{course.dateExpiration}</div>
        </div>
      ): (
        <div>No course Data</div>
      )}
    </div>
  )
}

export default Course

