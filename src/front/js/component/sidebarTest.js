import React from "react";
import { NavLink } from "react-router-dom";
import {ButtonView} from "../pages/buttonView"
import AlertView from "../pages/alertView";
import "../../styles/sidebar.css";

const Sidebar = ({children}) => {
    const menuItem = [
        {
            path:'/alert',
            name:'Alerts'
        },
        {
            path:'/button',
            name:'Buttons'
        }
    ]
    return (
        <div className="content">
            <div className="sidebar">
                <div className="top_section">
                    <h1 className="title">Components</h1>
                </div>

            
            {
                menuItem.map((item, index)=>(
                    <NavLink to={item.path} key={index} className="item-link" activeclassName="active">
                        <div className="item-text">{item.name}</div>
                    </NavLink>
                ))
            }
            </div>
            <main>{children}</main>
        </div>
    )
}

export default Sidebar;