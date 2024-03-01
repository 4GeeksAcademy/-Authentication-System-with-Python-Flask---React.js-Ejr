import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/profile.css"
export const Profile = () => {
    const { store, actions } = useContext(Context);
    return (
        <div className="text-center mt-5">
            <section className="h-100 gradient-custom-2">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-9 col-xl-7">
                            <div className="card">
                                <div className="rounded-top text-white d-flex flex-row" style={{backgroundColor: "#000", height:"200px",}}>
                                <div className="ms-4 mt-5 d-flex flex-column" style={{width: "150px",}}>
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                    alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"
                                    style={{width: "150px", zIndex: "1",}} />
                                        <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark"
                                        style={{zIndex: "1",}}>
                                        Edit profile
                                        </button>
                                </div>
                                <div className="ms-3" style={{marginTop: "130px",}}>
                                    <h5>Andy Horwitz</h5>
                                    <p className="text-start fw-lighter">New York</p>
                                </div>
                            </div>
                    <div className="p-4 text-black" style={{backgroundColor: "#F8F9FA",}}>
                        <div className="d-flex justify-content-end text-center py-1">
                            {/* <div>
                                <p className="mb-1 h5">253</p>
                                <p className="small text-muted mb-0">Photos</p>
                            </div>
                            <div className="px-3">
                                <p className="mb-1 h5">1026</p>
                                <p className="small text-muted mb-0">Followers</p>
                            </div>
                            <div>
                                <p className="mb-1 h5">478</p>
                                <p className="small text-muted mb-0">Following</p>
                            </div> */}
                        </div>
                    </div>
                        <div className="card-body p-4 text-black">
                            <div className="mb-5">
                                <p className="lead fw-normal mb-1 text-start text-decoration-underline">ABOUT
                                </p>
                                <div className="p-4" style={{backgroundColor: "#F8F9FA",}}>
                                    <p className="fs-6 fw-lighter mb-1 text-start lh-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed. Dictum varius duis at consectetur lorem donec. Scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada. Est ullamcorper eget nulla facilisi etiam dignissim diam quis. Auctor urna nunc id cursus metus. Consectetur libero id faucibus nisl tincidunt eget. Id eu nisl nunc mi ipsum faucibus vitae aliquet nec. Nec dui nunc mattis enim ut tellus elementum sagittis. Imperdiet sed euismod nisi porta lorem. Ullamcorper eget nulla facilisi etiam dignissim diam. Vel fringilla est ullamcorper eget nulla facilisi. Arcu felis bibendum ut tristique et egestas quis. Porta lorem mollis aliquam ut. Phasellus faucibus scelerisque eleifend donec pretium. Donec ultrices tincidunt arcu non sodales neque sodales. Auctor augue mauris augue neque gravida in. Viverra nam libero justo laoreet sit amet cursus.</p>
                                    {/* <p className="font-italic mb-1">Lives in New York</p>
                                    <p className="font-italic mb-0">Photographer</p> */}
                                </div>
                            </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <p className="lead fw-normal mb-0 text-decoration-underline">FAVORITES</p>
                                    <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
                                </div>
                                    <div className="row g-2">
                                        <div className="col mb-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                            alt="image 1" className="w-100 rounded-3" />
                                        </div>
                                        <div className="col mb-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                            alt="image 1" className="w-100 rounded-3" />
                                        </div>
                                    </div>
                                    <div className="row g-2">
                                        <div className="col">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                            alt="image 1" className="w-100 rounded-3" />
                                        </div>
                                        <div className="col">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                            alt="image 1" className="w-100 rounded-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};