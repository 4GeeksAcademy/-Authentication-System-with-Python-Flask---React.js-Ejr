// import React, { useState, useContext } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { Context } from '../../store/appContext'

// export const ManagerNavbar = () => {
//     const { store, actions } = useContext(Context)

//     const navigate = useNavigate()
//     function handleHomeView() {
//         localStorage.removeItem('jwt-token')
//         localStorage.removeItem('userToLogin');
//         navigate('/SignOut')
//     }

//     const handleMouseEnter = () => {
//         setHovered(true)
//         console.log(hovered => hovered + 1)
//     }
//     const handleMouseLeave = () => {
//         setHovered(false)

//     const userToLogin = JSON.parse(localStorage.getItem("userToLogin"))

//     return (
//         <div>
//             {
//                 (store.spinner)
//                     ? <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//                         <div className="text-center">
//                             <div className="spinner-border" role="status">
//                                 <span className="visually-hidden">Loading...</span>
//                             </div>
//                             <p>Loading...</p>
//                         </div>
//                     </div>
//                     : <nav className="navbar navbar-light bg-light">
//                         <div className="container-fluid">
//                         <div className="d-flex justify-content-center">
//                                 <button className="btn btn-white d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#coursesCategories" aria-expanded="false" aria-controls="coursesCategories" onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave}>
//                                     Categories
//                                 </button>
//                             </div>
//                             <div>
//                                 <div className="collapse position-absolute top-0 start-0" style={{ marginLeft: '10%' }} id="coursesCategories">
//                                     <div className="card card-body">
//                                         {store.category && store.category.length > 0 ? (
//                                             store.category.map((item, index) => {
//                                                 return (
//                                                     <a type="text" className="d-block mb-2" onClick={() => navigate(`/category/${item.titleCategory}`)} key={index}>{item.titleCategory}</a>
//                                                 )
//                                             })
//                                         ) : (
//                                             <a type="text" className="d-block mb-2">No category available</a>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col d-flex justify-content-end">
//                                 {
//                                     (!store.user)
//                                         ? <p className="text-center">Loading...</p>
//                                         : (store.user[`access_to_${store.currentRole}`]).map((item, index) => (
//                                             <span className='mx-2' key={index}>
//                                                 {
//                                                     (item.email === userToLogin.email)
//                                                         ? <span>Welcome,
//                                                             <strong> {item.name.toUpperCase()}</strong>
//                                                             <strong> {item.lastName.toUpperCase()}</strong>
//                                                         </span>
//                                                         : <div></div>
//                                                 }
//                                             </span>
//                                         ))
//                                 }
//                             </div>
//                             <button className="btn btn-outline-danger m-1 mx-2" onClick={handleHomeView}>
//                                 Sign Out
//                             </button>
//                             <div className='border border-warning  rounded-pill px-3 py-1'>
//                                 <span className='text-warning'>{store.currentRole}</span>
//                             </div>
//                         </div>

//                     </nav>
//             }
//         </div>
//     )
// };

import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/appContext'

export const ManagerNavbar = () => {
    const { store, actions } = useContext(Context)
    const [hovered, setHovered] = useState(false); // Definición del estado hovered

    const navigate = useNavigate()
    function handleHomeView() {
        localStorage.removeItem('jwt-token')
        localStorage.removeItem('userToLogin');
        navigate('/SignOut')
    }

    function handleHome() {
        navigate('/')
    }
    const handleMouseEnter = () => {
        setHovered(true)
        console.log(hovered => hovered + 1)
    }
    const handleMouseLeave = () => {
        setHovered(false)
    } // Cerramos correctamente la función handleMouseLeave

    const userToLogin = JSON.parse(localStorage.getItem("userToLogin"))

    return (
        <div>
            {
                (store.spinner)
                    ? <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p>Loading...</p>
                        </div>
                    </div>
                    : <nav className="navbar navbar-light bg-light">
                        <div className="container-fluid">
                            <div className='col-3'>
                                <img src="https://res.cloudinary.com/dfoegvmld/image/upload/v1717377021/i6uvyydr1sapaurgp3r5.png"
                                    alt="logo_alta_elearning" className='w-75' onClick={handleHome} style={{ cursor: 'pointer' }} />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-white d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#coursesCategories" aria-expanded="false" aria-controls="coursesCategories" onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave}>
                                    Categories
                                </button>
                            </div>
                            <div>
                                <div className="collapse position-absolute top-0 start-0" style={{ marginLeft: '10%' }} id="coursesCategories">
                                    <div className="card card-body">
                                        {store.category && store.category.length > 0 ? (
                                            store.category.map((item, index) => {
                                                return (
                                                    <a type="text" className="d-block mb-2" onClick={() => navigate(`/category/${item.titleCategory}`)} key={index}>{item.titleCategory}</a>
                                                )
                                            })
                                        ) : (
                                            <a type="text" className="d-block mb-2">No category available</a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col d-flex justify-content-end">
                                {
                                    (!store.user)
                                        ? <p className="text-center">Loading...</p>
                                        : (store.user[`access_to_${store.currentRole}`]).map((item, index) => (
                                            <span className='mx-2' key={index}>
                                                {
                                                    (item.email === userToLogin.email)
                                                        ? <span>Welcome,
                                                            <strong> {item.name.toUpperCase()}</strong>
                                                            <strong> {item.lastName.toUpperCase()}</strong>
                                                        </span>
                                                        : <div></div>
                                                }
                                            </span>
                                        ))
                                }
                            </div>
                            <button className="btn btn-outline-danger m-1 mx-2" onClick={handleHomeView}>
                                Sign Out
                            </button>
                            <div className='border border-warning  rounded-pill px-3 py-1'>
                                <span className='text-warning'>{store.currentRole}</span>
                            </div>
                        </div>

                    </nav>
            }
        </div>
    )
};
