import React from 'react';
import UsersProfile from '../component/UsersProfile';
import UserDescription from '../component/userview/UserDescripcion';
import { EditDescriptionUserAccordion } from '../component/userview/DescriptionUserAccordion';
import UserExperience from '../component/userview/UserExperience';
import UserLenguages from '../component/userview/UserLenguages';
import UserFavs from '../component/userview/UserFavs';
import '../../styles/userview.css';

export const Userview = () => {
    return (

        <div className="container">
            <div className='body'>
            <UsersProfile />


                <UserDescription title="Descripción">
                    <EditDescriptionUserAccordion />
                </UserDescription>

                <UserExperience title="Experiencia">
                    <EditDescriptionUserAccordion />
                </UserExperience> 

                <UserFavs title="Favs">
                    <EditDescriptionUserAccordion />
                </UserFavs>   

                <UserLenguages title="Idiomas">
                    <EditDescriptionUserAccordion />
                </UserLenguages>               
                   

                
                
            </div>
        </div>

    )
};


