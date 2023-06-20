import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/aboutUs.css";

export const AboutUs = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="min-vh-100 custom-aboutUs">

            <div className="container-fluid">

                <div className="row p-2">
                    <h1 className="justify-content-center" style={{ textAlign: 'center' }}> What is StarWash?</h1> <br />
                    <h5 className="justify-content-center mb-2 align-items-center" style={{ textAlign: 'justify' }}>
                        StarWash is a passionate, committed, and environmentally conscious company. They are always ready to meet the needs of their customers and strive to make a positive difference in the world of car washing.
                    </h5>
                </div>




                <div className="row justify-content-center">

                    <div className="card custom-aboutUs border-0 col-sm-2 min-vh-100" >

                        <h4 style={{ textAlign: 'center' }}>Mission</h4>
                        <p className="card-text justify">Our mission is to provide exceptional and environmentally-friendly mobile car wash service. We are committed to offering comprehensive care for our customers' vehicles, using exclusively eco-friendly products that minimize negative impact on the natural environment. We strive to exceed our customers' expectations by delivering a convenient, reliable, and high-quality washing experience while promoting sustainable practices that contribute to environmental preservation.</p>

                    </div>



                    <div className="col-sm-8 min-vh-100">

                        <div className="d-flex">
                            <div className="card border-0 custom-aboutUs" style={{ width: "18rem", padding: '5px' }}>
                                <img src="https://plus.unsplash.com/premium_photo-1664475605026-e1feb5c77922?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80" className="card-img-top" alt="..." />
                            </div>
                            <div className="card border-0 custom-aboutUs" style={{ width: "18rem", padding: '5px' }}>
                                <img src="https://plus.unsplash.com/premium_photo-1664298082231-d3dacfe475d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" className="card-img-top" alt="..." />
                            </div>
                            <div className="card border-0 custom-aboutUs" style={{ width: "18rem", padding: '5px' }}>
                                <img src="https://plus.unsplash.com/premium_photo-1661684449481-c5abe43a82c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" className="card-img-top" alt="..." />
                            </div>
                        </div>


                        <div className="d-flex">
                            <div className="card border-0 custom-aboutUs" style={{ width: "18rem", padding: '5px' }}>
                                <img src="https://images.unsplash.com/photo-1518830892177-d7611245a832?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" className="card-img-top" alt="..." />

                            </div>
                            <div className="card border-0 custom-aboutUs" style={{ width: "18rem", padding: '5px' }}>
                                <img src="https://images.unsplash.com/photo-1622426141446-5148b6fa1115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" className="card-img-top" alt="..." />

                            </div>
                            <div className="card border-0 custom-aboutUs" style={{ width: "18rem", padding: '5px' }}>
                                <img src="https://images.unsplash.com/photo-1678986489261-6cf27bd58175?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" className="card-img-top" alt="..." />

                            </div>
                        </div>

                        <div className="d-flex">
                            <div className="card border-0 custom-aboutUs" style={{ width: "18rem", padding: '5px' }}>
                                <img src="https://plus.unsplash.com/premium_photo-1661778990198-076b9656b54d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" className="card-img-top" alt="..." />

                            </div>
                            <div className="card border-0 custom-aboutUs" style={{ width: "18rem", padding: '5px' }}>
                                <img src="https://images.unsplash.com/photo-1465172018141-c4e4fa823289?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" className="card-img-top" alt="..." />

                            </div>
                            <div className="card border-0 custom-aboutUs" style={{ width: "18rem", padding: '5px' }}>
                                <img src="https://images.unsplash.com/photo-1485456780483-06106d602fef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" className="card-img-top" alt="..." />

                            </div>
                        </div>

                    </div>


                    <div className="card custom-aboutUs border-0 col-sm-2 min-vh-100" >

                        <h4 style={{ textAlign: 'center' }}>Vision</h4>
                        <p className="card-text justify">Our vision is to become the leading eco-friendly mobile car wash company, recognized for our excellence in customer service and commitment to environmental sustainability. We aspire to set a standard in the industry, driving the shift towards more environmentally-friendly vehicle washing practices and promoting environmental awareness in our community. Through continuous innovation and strategic expansion, we aim to be market leaders, providing convenient and eco-conscious washing solutions to meet the evolving needs of our customers and make a positive impact on the planet's care.</p>

                    </div>
                </div>

            </div>

        </div>

    );
};

