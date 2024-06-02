// import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { UserNavbar } from "../component/User/UserNavbar.jsx";
// import { Context } from "../store/appContext.js";

// export const CourseCategorySelected = () => {
//     const { store } = useContext(Context);
//     const { titleCategory } = useParams();
//     const [categories, setCategories] = useState([]);
//     const [courses, setCourses] = useState([]);

//     useEffect(() => {
//         if (store.category) {
//             const categorySelected = store.category.filter(category => category.titleCategory === titleCategory);
//             setCategories(categorySelected);
//         }
//     }, [store.category, titleCategory]);

//     useEffect(()=>{
//         const categoryCourses = store.courses?.course.access_to_course.filter(course=>course.id == parseInt(id))
//         setCourses(categoryCourses)
//     },[store.course.access_to_course, id])

//     if(store.course?.access_to_course.categoryTitle == store.category?.titleCategory){
//         console.log("you have done it!")
//     }
//     return (
//         <div>
//             <UserNavbar />
//             
//         </div>
//     );
// };
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserNavbar } from "../component/User/UserNavbar.jsx";
import { Context } from "../store/appContext.js";

export const CourseCategorySelected = () => {
    const { store } = useContext(Context);
    const { titleCategory } = useParams();
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (store.category) {
            const categorySelected = store.category.filter(category => category.titleCategory === titleCategory);
            setCategories(categorySelected);
        }
    }, [store.category, titleCategory]);
    
    useEffect(() => {
        if (store.course && store.course.access_to_courses) {
            const categoryCourses = store.course.access_to_courses.filter(course => course.categoryTitle === titleCategory);
            setCourses(categoryCourses);
        }
    }, [store.course, titleCategory]);
    
    console.log(store.course.access_to_courses);
    
    return (
        <div>
            <UserNavbar />
            <div>
                    <h3>Courses:</h3>
                    {courses.length > 0 ? (
                        courses.map((course, index) => (
                            <div key={index} className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={course.titleUrlMedia} className="img-fluid rounded-start" alt={course.title} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{course.title}</h5>
                                            <p className="card-text">{course.description}</p>
                                            <p className="card-text">
                                                <small className="text-muted">Price: ${course.price}</small>
                                            </p>
                                            <p className="card-text">
                                                <small className="text-muted">Teacher: {course.titleTeacher}</small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>There are no courses available for this category</p>
                    )}
                </div>
        </div>
    );
};

