import React from 'react'
import "../../styles/route_card.css"


export const RouteCard = ({title, img, desc, score}) => {
    return(
        <div className="card mb-3 border-0" style={{maxWidth: '745px', background: '#D9D9D9', borderRadius:'15px'}}>
            <div className="row g-0 p-3">
                <div className="col-md-4 pb-0">
                <img src={img} className="img-fluid rounded-4" style={{minHeight: '184px', borderRadius:'15px', objectFit:'cover'}} alt="..."/>
                </div>
                <div className="col-md-8">
                <div className="card-body py-0" style={{minHeight:'184px'}}>
                    <div className='d-flex'>
                    <h5 className="card-title me-auto">{title}</h5>
                    <p>Score: {score}</p>
                    </div>
                    <p className="card-text">{desc}</p>
                </div>
                </div>
            </div>
        </div>
    )
}