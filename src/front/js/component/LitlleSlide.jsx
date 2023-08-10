import React from 'react'
import Slogan from './Slogan'

const LitlleSlide = () => {
    return (
        <div>
            <div id="carouselExampleFade" className=" litleslide carousel slide carousel-fade mt-4" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://picsum.photos/id/218/500/200" className=" litleslideimg d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">

                            <h5 className='title-slide'>First slide label</h5>
                            <p className='desc'>Some representative placeholder content for the first slide.</p>

                            {/* <Slogan /> */}

                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://picsum.photos/id/231/500/200" className=" litleslideimg d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5 className='title-slide'>First slide label</h5>
                            <p className='desc'>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://picsum.photos/id/328/500/200" className="litleslideimg d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5 className='title-slide'>First slide label</h5>
                            <p className='desc'>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default LitlleSlide