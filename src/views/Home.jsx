import React from 'react'
import style from '../../src/front/styles/Home.module.css'


const Home = () => {
    return (

        
        <div>
            


            <div className={style.main}>
                <div className={style.main__container}>
                    <div className={style.main__content}>
                        <h1>NEXT GENERATION GYM</h1>
                        <h2>TECHNOLOGY</h2>
                        <p>See what makes us different.</p>
                        <button className={style.main__btn}><a href="/">Get Started</a></button>
                    </div>
                    <div className={style.main__img__container}>
                        <img src="https://images.pexels.com/photos/5384000/pexels-photo-5384000.jpeg?auto=compress&cs=tinysrgb&w=600" alt="pic" id={style.main__img} />
                    </div>
                </div>
            </div>


            <div className={style.services}>
                <h1>See what the hype is about</h1>
                <div className={style.services__container}>
                    <div className={style.services__card}>
                        <h2>Experience Fitness</h2>
                        <p>Best Technology Gym</p>
                        <button>Get Started</button>
                    </div>
                    <div className={style.services__card}>
                    
                        <h2>Are You Ready</h2>
                        <p>Take The Challenge</p>
                        <button>Get Started</button>
                    </div>
                    <div className={style.services__card}>
                    
                        <h2>Transform Yourself</h2>
                        <p>Get Motivated</p>
                        <button>Get Started</button>
                    </div>
                </div>
            </div>


            <div className={style.footer__container}>
                <div className={style.footer__links}>
                    <div className={style.footer__link__wrapper}>
                        <div className={style.footer__link__items}>
                            <h2>About Us</h2>
                            <a href="/">How it works</a>
                            <a href="/">Testimonials</a>
                            <a href="/">Careers</a>
                            <a href="/">Investments</a>
                            <a href="/">Terms of service</a>
                        </div>
                        <div className={style.footer__link__items}>
                            <h2>Contact Us</h2>
                            <a href="/">Contact</a>
                            <a href="/">Support</a>
                            <a href="/">Destinations</a>
                            <a href="/">Sponsorship</a>
                        </div>
                    </div>
                    <div className={style.footer__link__wrapper}>
                        <div className={style.footer__link__items}>
                            <h2>Videos</h2>
                            <a href="/">Submit Video</a>
                            <a href="/">Ambassadors</a>
                            <a href="/">Agency</a>
                            <a href="/">Influencer</a>

                        </div>
                        <div className={style.footer__link__items}>
                            <h2>Social Media</h2>
                            <a href="/">Instagram</a>
                            <a href="/">Facebook</a>
                            <a href="/">Youtube</a>
                            <a href="/">LinkedIn</a>
                        </div>
                    </div>
                </div>
                <div className={style.social__media}>
                    <div className={style.social__media__wrap}>
                        <div className={style.footer__logo}>
                            <a href="/" id={style.footer__logo}><i className="fa-solid fa-dumbbell"></i>__GYMApp</a>
                        </div>
                        <p className={style.website__rights}><i class="fa-solid fa-copyright"></i>GYMApp 2023. All rights reserved</p>
                    <div className={style.social__icons}>
                        <a href="/" className={style.social__icon__link} target="_blank">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a href="/" className={style.social__icon__link} target="_blank">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="/" className={style.social__icon__link} target="_blank">
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                        <a href="/" className={style.social__icon__link} target="_blank">
                        <i class="fa-brands fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div >
    )
}


export default Home