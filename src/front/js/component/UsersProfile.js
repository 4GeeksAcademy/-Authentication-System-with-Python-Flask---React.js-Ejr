import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ProfileImage from './ProfileImage';
import { UserNameEdit } from './userview/EditUserName';
import { EditUserPhone } from './userview/EditUserPhone';
import { EditUserMail } from './userview/EditUserMail';
import ProfileProgress from './ProfileProgress';
import CountrySelector from './Dropdown';
import Stars from './stars';

import SkillRow from './userview/CardHabilities';
import CarrerSelector from './userview/dropdownuser';


const UsersProfile = () => {
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-9">
                    <div className="card mb-4" style={styles.profileCard}>
                        <div className="row align-items-center">

                            <div className="col-md-4 text-center">
                                <ProfileImage />
                            </div>


                            <div className="col-md-4">
                                <UserNameEdit />
                                <CarrerSelector />
                                <div>
                                    <EditUserPhone />
                                    <EditUserMail />
                                </div>
                            </div>


                            <div className="col-md-4 text-center">
                                <Stars rating={4.3} />
                                <FontAwesomeIcon icon={faStar} style={styles.star} />
                                <CountrySelector />
                            </div>
                        </div>
                    </div>
                    <div >

                        
                            
                            <SkillRow />
                       

                    </div>
                </div>
                <div className="col-lg-3 text-center">
                    <div className="card" style={styles.progressCard}>
                        <ProfileProgress progress={78} />
                        <p>78% Del Perfil Completado</p>
                        <div class="row justify-content-around">
    <div class="col-6">
    <div className='text-start'>
                            <p>Proyectos completados</p>
                            <p>Proyectos en curso</p>
                            <p>Calificacion de clientes</p>
                            <p>Penalizaciones</p>
                            <p>Certificados</p>
                            <p>Favoritos</p>
                            <p>Proyectos destacados</p>
                            <p>Empresas con las que trabajaste</p>
                        </div>
    </div>
    <div class="col-2">
    <div className='text-end'>
                            <p>5</p>
                            <p>4</p>
                            <p>7</p>
                            <p>1</p>
                            <p>9</p>
                            <p>5</p>
                            <p>7</p>
                            <p>6</p>
                        </div>
    </div>
  </div>
                            
                        

                    </div>
                </div>



            </div>



        </div>
    );
};

const styles = {
    profileCard: {
        backgroundColor: '#6793AE',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    HabilitiesCard: {
        backgroundColor: '#D9D9D9',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    experienceCard: {
        backgroundColor: '#6793AE',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        
        
    },
    progressCard: {
        backgroundColor: '#f3f4f6',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    skillsCard: {
        backgroundColor: '#f3f4f6',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        marginTop: '20px',
    },
    star: {
        color: '#f8b400',
        marginLeft: '5px',
    },
};

export default UsersProfile;
