import React, {useContext} from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";


export const Jumbotron = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <header className=" jumbotronPrincipal py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <h1 className="display-4 fw-bold">Welcome to My Website</h1>
                            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                            <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                        </div>
                        <div className="col-lg-4 text-center">
                            <img src="https://cdn.midjourney.com/b0e208dd-bb10-4583-8528-132745647d7d/0_2.png" alt="Example" className="img-fluid rounded" />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Jumbotron;