import React, {useContext} from 'react'
import { Context } from '../store/appContext.js'


const OffersCard = () => {
    const {store} = useContext(Context)
    return (
        <div className="card bg-dark text-white mt-4 container" style={{ height: "16rem", width: "20rem" }}>
            
            <img src="..." className="card-img" alt="..."></img>
            <div className="card-img-overlay">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p className="card-text">Last updated 3 mins ago</p>
            </div>
        </div>
    )
}

export default OffersCard