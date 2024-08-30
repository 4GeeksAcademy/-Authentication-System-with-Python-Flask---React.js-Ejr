import React from 'react';
import UsersProfile from '../component/userview/UsersProfile';
import UserDescription from '../component/userview/UserDescripcion';
import { EditDescriptionUserAccordion } from '../component/userview/DescriptionUserAccordion';
import UserExperience from '../component/userview/UserExperience';
import UserLenguages from '../component/userview/UserLenguages';
import UserProjects from '../component/userview/UserProjects';
import UserFavs from '../component/userview/UserFavs';
import { EditFavoritesUserAccordion } from '../component/userview/FavsUserAccordion';
import { EditLanguageUserAccordion } from '../component/userview/lenguagesUserAccordion';
import { EditExperienceUserAccordion } from '../component/userview/experinceUserAccordion';
import EditProjectsAccordion from '../component/userview/projecstUserAccordion';
import '../../styles/userview.css';

export const Userview = () => {
    return (

        <div className="container-userview">
            <div className='body-userview'>
                <UsersProfile />


                <UserDescription title="Descripción">
                    <EditDescriptionUserAccordion />
                </UserDescription>

                <UserExperience title="Experiencia">
                    <EditExperienceUserAccordion />
                </UserExperience>

                <UserFavs title="Favs">
                    <EditFavoritesUserAccordion />
                </UserFavs>

                <UserLenguages title="Idiomas">
                    <EditLanguageUserAccordion />
                </UserLenguages>

                <UserProjects title="Proyectos">
                    <EditProjectsAccordion />
                </UserProjects>




            </div>
        </div>

    )
};


