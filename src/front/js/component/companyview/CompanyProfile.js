import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEdit, faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import ProfileImage from '../ProfileImage';
import { ButtonEdit } from './EditCompanyName';
import { EditCompanyDescription } from './EditCompanyDescription';
import { EditCompanyPhone } from './EditCompanyPhone';
import { EditCompanyMail } from './EditCompanyMail';
import ProfileProgress from '../ProfileProgress';
import CountrySelector from '../Dropdown';
import RatingStars from '../RatingStars';
import Stars from '../stars';


const CompanyProfile = () => {
    return (


        <div className="row">

            <div className="col-md-9">
                <div className="card" style={styles.card}>
                    <div className="row align-items-center">

                        <div className="col-md-4 text-center">
                            <ProfileImage />
                        </div>


                        <div className="col-md-4">
                            <div className="d-flex align-items-center mb-2">
                                <ButtonEdit />
                            </div>

                            <div className="mb-2">
                                <EditCompanyDescription />
                            </div>

                            <div className="mb-2 d-flex align-items-center">

                                <EditCompanyPhone />
                            </div>

                            <div className="mb-2 d-flex align-items-center">

                                <EditCompanyMail />
                            </div>
                        </div>


                        <div className="col-md-4 d-flex flex-column">

                            <Stars />

                            <div className="d-flex align-items-center">
                                <CountrySelector />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col-md-3 text-center">
                <div className="card p-3" style={styles.progressCard}>
                    <ProfileProgress />
                </div>
            </div>
        </div>

    );
};


const styles = {

    card: {
        backgroundColor: '#d0e1f2',
        borderRadius: '10px',
        padding: '20px',
        height: '100%',
        border: 'none',
    },
    progressCard: {
        backgroundColor: 'rgba(217, 217, 217, 1)',
        borderRadius: '10px',
        padding: '20px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
    },
    companyName: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
    },
    editIcon: {
        fontSize: '1rem',
        color: '#007bff',
    },
    star: {
        color: '#f8b400',
    },
    ratingText: {
        fontWeight: 'bold',
        fontSize: '1rem',
    },
};

export default CompanyProfile;
