import React from "react"
import "../../styles/personal-info.css"
import avatar from "../../img/avatar.png"


export const PersonalInfoProfile = () => {
    return (
        <div style={{ marginLeft: '150px', marginTop: '50px' }}>
        <div className="div-general">

            <div id="div1">
                <div id="margin-card">
                    <div className="card">
                        <img src={avatar} className="card-img-top" alt="profile photo" />
                        <div className="card-body">
                            <h5 className="card-title">Carlos Pinto</h5>
                            <p className="card-text">Active user</p>
                            <a href="#" className="btn btn-primary">Edit profile</a>
                        </div>
                    </div>
                </div>


                <div >

                    <h1>Name</h1>
                    <p id="name">Carlos</p>
                    <h2>Last name</h2>
                    <p>Pinto</p>
                    <h2>E-mail</h2>
                    <p>Cpinto@gmail.com</p>
                    <h2>Date</h2>
                    <p>12/11/1990</p>
                    <a href="#" className="btn btn-primary">Save</a>
                    
                 

                </div>


            </div>
            



        </div>

        </div>
    );
}