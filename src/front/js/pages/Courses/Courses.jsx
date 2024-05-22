import React from 'react'
import CourseCard from '../../component/Courses/CourseCard.jsx'
const courses = [
    {
        id:1,
        img:"https://i.blogs.es/1d8a5b/python1/1024_2000.jpg",
        title:"Become a Python Expert!",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida ac nibh ac varius. Nullam a maximus metus. Nam et ex est."
    },
    {
        id:2,
        img:"https://passiveincomemd.com/wp-content/uploads/2019/12/top-ten-matter-most-personal-finance-scaled-1-2048x1366.jpg",
        title:"Personal Finances Now",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida ac nibh ac varius. Nullam a maximus metus. Nam et ex est."
    },
    {
        id:3,
        img:"https://media.tarkett-image.com/medium/EMEA_PI_20161128_10_steps_interior_design.jpg",
        title:"Interior Design Mastery",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida ac nibh ac varius. Nullam a maximus metus. Nam et ex est."
    },
    {
        id:4,
        img:"https://images.inc.com/uploaded_files/image/1920x1080/getty_487667109_351823.jpg",
        title:"Public Speaking",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida ac nibh ac varius. Nullam a maximus metus. Nam et ex est."
    },
    {
        id:5,
        img:"https://www.udla.edu.ec/qestudiarenlau/wp-content/uploads/2022/01/Disen%CC%83o-sin-ti%CC%81tulo-43.png",
        title:"Mindfulness Meditation",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida ac nibh ac varius. Nullam a maximus metus. Nam et ex est."
    },
    {
        id:6,
        img:"https://miro.medium.com/v2/resize:fit:1100/format:webp/0*RfvInMt7Z1TSCa8N",
        title:"Full-Stack WebDev Course",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida ac nibh ac varius. Nullam a maximus metus. Nam et ex est."
    },
]
const Courses = () => {
  return (
<div className="d-flex overflow-auto justify-content-center p-4 flex-wrap">
    {courses && courses.length > 0 && courses.map(course => {
        return(
        <CourseCard key={course.id} id={course.id} img={course.img} title={course.title} description={course.description}/>
    )
    })}
</div>
)
}

export default Courses